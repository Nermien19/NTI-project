import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skillsSection: any;

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.loadSkillsSection();
  }

  loadSkillsSection() {
    this.skillsService.getSkills().subscribe(data => {
      this.skillsSection = data[0];
    });
  }
}
