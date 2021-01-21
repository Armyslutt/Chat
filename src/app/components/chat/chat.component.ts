import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AnyTxtRecord } from 'dns';
import { WebSocketService } from '../../services/web-socket.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userChat = {
    user: '',
    text: ''
  }

  newMessages;
  eventName = 'send-messages'


  constructor(private activated : ActivatedRoute, private webservice : WebSocketService) { }

  ngOnInit(): void {
    const id = this.activated.snapshot.params.id;
      this.userChat.user =id;

      this.webservice.listen('text-event').subscribe ((data) => {
      this.newMesagges = data;
    })
  }
  
  newMessages(){
    this.webservice.emit(this.eventName, this.userChat);
    this.userChat.text = '';
  }
}