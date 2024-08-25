import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contact: any = {};
  emailList: any[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContact().subscribe(data => {
      this.contact = data || {};
      this.emailList = data?.emails || [];
    });
  }

  saveContact(): void {
    this.contactService.updateContact(this.contact).subscribe(() => {
      alert('Contact section updated');
    });
  }

  deleteEmail(id: string): void {
    this.contactService.deleteEmail(id).subscribe(() => {
      this.loadContact();
    });
  }
}
