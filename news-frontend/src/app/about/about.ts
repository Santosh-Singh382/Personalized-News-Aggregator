import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {

  teamMembers = [
    {
      name: '.....',
      role: 'Founder & Backend Architect',
      photo: '',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: '.....',
      role: 'Frontend Developer',
      photo: '',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: '.....',
      role: 'UI/UX Designer',
      photo: '',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: '.....',
      role: 'Data Scientist (AI/ML)',
      photo: '',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: '.....',
      role: 'Mobile App Developer',
      photo: '',
      linkedin: '#',
      twitter: '#',
      github: '#'
    },
    {
      name: '......',
      role: 'Content Strategist',
      photo: '',
      linkedin: '#',
      twitter: '#',
      github: '#'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

}
