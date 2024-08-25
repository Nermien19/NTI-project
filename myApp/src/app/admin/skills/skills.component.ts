import { Component, OnInit } from '@angular/core';
import { SkillsService } from '../../services/skills.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  skillsData: any = { sectionName: '', description: '', brief: '', skills: [] };
  skillData: any = { name: '', description: '', image: null };

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.loadSkillsSection();
  }

  loadSkillsSection() {
    this.skillsService.getSkills().subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {
        this.skillsData = data[0]; // Assuming you're dealing with one skills section
      } else {
        this.skillsData = { sectionName: '', description: '', brief: '', skills: [] };
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.skillData.image = event.target.files[0];
    }
  }

  saveSkillsSection() {
    console.log('Saving Skills Section:', this.skillsData);
    if (this.skillsData._id) {
      this.skillsService.updateSkillSection(this.skillsData._id, this.skillsData).subscribe(() => {
        this.loadSkillsSection();
      }, (error: any) => {
        console.error('Error updating skills section:', error);
      });
    } else {
      this.skillsService.addSkillSection(this.skillsData).subscribe(() => {
        this.loadSkillsSection();
      }, (error: any) => {
        console.error('Error adding skills section:', error);
      });
    }
  }

  saveSkill() {
    if (!this.skillsData._id) {
      console.error('Skills section must be saved before adding skills');
      return;
    }

    if (this.skillData._id) {
      this.skillsService.updateSkill(this.skillsData._id, this.skillData._id, this.skillData).subscribe(
        () => {
          console.log('Skill updated successfully');
          this.loadSkillsSection();
          this.clearSkillForm();
        },
        error => {
          console.error('Error updating skill:', error);
        }
      );
    } else {
      this.skillsService.addSkill(this.skillsData._id, this.skillData).subscribe(
        () => {
          console.log('Skill added successfully');
          this.loadSkillsSection();
          this.clearSkillForm();
        },
        error => {
          console.error('Error adding skill:', error);
        }
      );
    }
  }

  clearSkillForm() {
    this.skillData = { name: '', description: '', image: null };
  }

  editSkill(skill: any) {
    this.skillData = { ...skill };
  }

  deleteSkill(skill: any) {
    if (!this.skillsData._id) {
      console.error('Skills section must be saved before deleting skills');
      return;
    }

    this.skillsService.deleteSkill(this.skillsData._id, skill._id).subscribe(
      () => {
        console.log('Skill deleted successfully');
        this.loadSkillsSection(); // Refresh the skills section after deletion
      },
      error => {
        console.error('Error deleting skill:', error);
      }
    );
  }

  addSkill() {
    this.skillsData.skills.push({ ...this.skillData });
    this.skillData = { name: '', description: '', image: null };
  }

  removeSkill(index: number) {
    this.skillsData.skills.splice(index, 1);
  }

  clearForm() {
    this.skillsData = { sectionName: '', image: '', brief: '', description: '', skills: [] };
  }

}
