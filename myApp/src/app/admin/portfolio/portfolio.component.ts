import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent  implements OnInit {
  portfolioData: any = { sectionName: '', description: '', brief: '', image: '', projects: [] };
  projectData: any = { name: '', popup: '', image: null };

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadPortfolioSection();
  }

  loadPortfolioSection() {
    this.portfolioService.getPortfolio().subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {
        this.portfolioData = data[0]; // Assuming you're dealing with one portfolio section
      } else {
        this.portfolioData = { sectionName: '', description: '', brief: '', image: '', projects: [] };
      }
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.projectData.image = event.target.files[0];
    }
  }

  savePortfolioSection() {
    console.log('Saving Portfolio Section:', this.portfolioData);
    if (this.portfolioData._id) {
      this.portfolioService.updatePortfolio(this.portfolioData._id, this.portfolioData).subscribe(() => {
        this.loadPortfolioSection();
      }, error => {
        console.error('Error updating portfolio section:', error);
      });
    } else {
      this.portfolioService.addPortfolio(this.portfolioData).subscribe(() => {
        this.loadPortfolioSection();
      }, error => {
        console.error('Error adding portfolio section:', error);
      });
    }
  }

  // saveProject() {
  //   if (!this.portfolioData._id) {
  //     console.error('Portfolio section must be saved before adding projects');
  //     return;
  //   }

  //   console.log('Saving Project:', this.projectData);
  //   this.portfolioService.addProject(this.portfolioData._id, this.projectData).subscribe(
  //     () => {
  //       console.log('Project added successfully');
  //       this.loadPortfolioSection(); // Refresh the portfolio section to include the new project
  //       this.clearProjectForm(); // Clear the form after saving
  //     },
  //     error => {
  //       console.error('Error adding project:', error);
  //     }
  //   );
  // }
  editIndex: number | null = null;
  editProject(project: any) {
    this.projectData = { ...project };
  }

  // saveProject() {
  //   if (!this.portfolioData._id) {
  //     console.error('Portfolio section must be saved before adding projects');
  //     return;
  //   }

  //   if (this.editIndex !== null) {
  //     // Update the existing project
  //     this.portfolioData.projects[this.editIndex] = { ...this.projectData };
  //     this.portfolioService.updatePortfolio(this.portfolioData._id, this.portfolioData).subscribe(() => {
  //       this.loadPortfolioSection();
  //       this.clearProjectForm();
  //       this.editIndex = null;  // Reset editing index after saving
  //     });
  //   } else {
  //     // Add a new project
  //     this.portfolioService.addProject(this.portfolioData._id, this.projectData).subscribe(() => {
  //       this.loadPortfolioSection();
  //       this.clearProjectForm();
  //     });
  //   }
  // }


  saveProject() {
    if (!this.portfolioData._id) {
      console.error('Portfolio section must be saved before adding projects');
      return;
    }

    if (this.projectData._id) {
      this.portfolioService.updateProject(this.portfolioData._id, this.projectData._id, this.projectData).subscribe(
        () => {
          console.log('Project updated successfully');
          this.loadPortfolioSection();
          this.clearProjectForm();
        },
        error => {
          console.error('Error updating project:', error);
        }
      );
    } else {
      this.portfolioService.addProject(this.portfolioData._id, this.projectData).subscribe(
        () => {
          console.log('Project added successfully');
          this.loadPortfolioSection();
          this.clearProjectForm();
        },
        error => {
          console.error('Error adding project:', error);
        }
      );
    }
  }

  clearProjectForm() {
    this.projectData = { name: '', popup: '', image: null };
  }

  // editProject(project: any) {
  //   this.projectData = { ...project };
  // }

  deleteProject(project: any) {
    if (!this.portfolioData._id) {
      console.error('Portfolio section must be saved before deleting projects');
      return;
    }

    this.portfolioService.deleteProject(this.portfolioData._id, project._id).subscribe(
      () => {
        console.log('Project deleted successfully');
        this.loadPortfolioSection(); // Refresh the portfolio section after deletion
      },
      error => {
        console.error('Error deleting project:', error);
      }
    );
  }
   // deleteProject(project: any) {
  //   if (!this.portfolioData._id) {
  //     console.error('Portfolio section must be saved before deleting projects');
  //     return;
  //   }

  //   // Assuming each project has a unique identifier `_id`
  //   this.portfolioService.deleteProject(this.portfolioData._id, project._id).subscribe(() => {
  //     console.log('Project deleted successfully');
  //     this.loadPortfolioSection();  // Refresh the portfolio section to reflect the deletion
  //   }, error => {
  //     console.error('Error deleting project:', error);
  //   });
  // }

  // deleteProject(project: any) {

  //   this.portfolioData.projects = this.portfolioData.projects.filter((p: any) => p !== project);


  // }
// deleteProject(project: any) {
//   if (!this.portfolioData._id) {
//     console.error('Portfolio section must be saved before deleting projects');
//     return;
//   }

//   // Call the service method to delete the project from the server
//   this.portfolioService.deleteProject(this.portfolioData._id, project._id).subscribe(
//     () => {
//       console.log('Project deleted successfully');
//       // Remove the project from the local list after successful deletion
//       this.portfolioData.projects = this.portfolioData.projects.filter((p: any) => p._id !== project._id);
//     },
//     error => {
//       console.error('Error deleting project:', error);
//     }
//   );
// }
  addProject() {
    this.portfolioData.projects.push({ ...this.projectData });
    this.projectData = { name: '', popup: '', image: '' };
  }

  removeProject(index: number) {
    this.portfolioData.projects.splice(index, 1);
  }

  clearForm() {
    this.portfolioData = { sectionName: '', image: '', brief: '', description: '', projects: [] };
  }
}
