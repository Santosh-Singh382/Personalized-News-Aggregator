    const express = require('express');
    const router = express.Router();
    const { Configuration, OpenAIApi } = require('openai');
    const jwt = require('jsonwebtoken');
    const multer = require('multer');
    const User = require('../models/User');
    const Case = require('../models/Case');
    const Prescription = require('../models/Prescription');
    const Order = require('../models/Order');
    const upload = multer({ dest: 'uploads/' });
    const ensureAuth = (req,res,next)=>{
      const auth = req.headers.authorization;
      if(!auth) return res.status(401).json({error:'Unauthorized'});
      const token = auth.split(' ')[1];
      try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
      }catch(e){ return res.status(401).json({error:'Invalid token'}); }
    };
    // me
    router.get('/me', ensureAuth, async (req,res)=>{
      const u = await User.findById(req.user.id).select('-passwordHash');
      res.json({user:u});
    });
    // create case (second opinion)
    router.post('/case', ensureAuth, async (req,res)=>{
      try{
        const { patientId, title, notes } = req.body;
        const c = new Case({ patientId: patientId || req.user.id, createdBy: req.user.id, title, notes });
        await c.save();
        res.json({case:c});
      }catch(e){ console.error(e); res.status(500).json({error:'err'}); }
    });
    // assign case to specialist
    router.post('/case/:id/assign', ensureAuth, async (req,res)=>{
      try{
        const c = await Case.findById(req.params.id);
        if(!c) return res.status(404).json({error:'Not found'});
        c.assignedTo = req.body.specialistId;
        c.status = 'consulting';
        await c.save();
        res.json({case:c});
      }catch(e){ console.error(e); res.status(500).json({error:'err'}); }
    });
    // upload attachments for case
    router.post('/case/:id/attach', ensureAuth, upload.single('file'), async (req,res)=>{
      try{
        const c = await Case.findById(req.params.id);
        if(!c) return res.status(404).json({error:'Not found'});
        c.attachments.push(req.file.filename);
        await c.save();
        res.json({case:c});
      }catch(e){ console.error(e); res.status(500).json({error:'err'}); }
    });
    // create prescription
    router.post('/prescription', ensureAuth, async (req,res)=>{
      try{
        const { patientId, medications, notes } = req.body;
        const p = new Prescription({ patientId, doctorId: req.user.id, medications, notes });
        await p.save();
        res.json({prescription:p});
      }catch(e){ console.error(e); res.status(500).json({error:'err'}); }
    });
    // place order to pharmacy (simple)
    router.post('/order', ensureAuth, async (req,res)=>{
      try{
        const { pharmacyId, items } = req.body;
        const o = new Order({ patientId: req.user.id, pharmacyId, items });
        await o.save();
        res.json({order:o});
      }catch(e){ console.error(e); res.status(500).json({error:'err'}); }
    });
    // AI symptom checker - improved prompt handling and JSON output
    router.post('/ai/symptom-check', ensureAuth, async (req,res)=>{
      try{
        const { symptoms, age, gender, context } = req.body;
        if(!symptoms) return res.status(400).json({error:'Provide symptoms'});
        const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
        const openai = new OpenAIApi(configuration);
        const prompt = `You are an experienced general physician. Patient details: age=${age||'unknown'}, gender=${gender||'unknown'}. Context: ${context||'none'}. Symptoms: ${symptoms}.
Please respond with JSON containing keys: "likely_causes" (array of short phrases), "red_flags" (array), "next_steps" (array of suggestions), "confidence" (low|medium|high), "explanation" (short). Keep output concise and in JSON only.`;
        const completion = await openai.createChatCompletion({
          model: "gpt-4o-mini",
          messages: [{role:'system', content:'You are a helpful medical assistant.'},{role:'user', content:prompt}],
          temperature: 0.1,
          max_tokens: 500,
        });
        const aiText = completion.data.choices[0].message.content;
        let parsed;
        try{ parsed = JSON.parse(aiText); } catch(e){ parsed = { raw: aiText }; }
        res.json({answer: parsed});
      }catch(err){ console.error(err.response?.data||err); res.status(500).json({error:'AI error'}); }
    });
    module.exports = router;
