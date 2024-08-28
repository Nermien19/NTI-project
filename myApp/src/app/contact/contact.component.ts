import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contact: any = {};
  email: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContact().subscribe(data => {
      this.contact = data || {};
    });
  }

  submitEmail(): void {
    if (this.email) {
      this.contactService.submitEmail(this.email).subscribe(() => {
        alert('message sent');
        this.email = '';
      });
    } else {
      alert('Please enter a valid message');
    }
  }
}
