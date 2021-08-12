import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-radio-card',
  templateUrl: './radio-card.component.html',
  styleUrls: ['./radio-card.component.css']
  // encapsulation: ViewEncapsulation.None
})
export class RadioCardComponent implements OnInit {

  message1: string;
  favoriteSeason: string;
  seasons: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae', 
  'Summer', 
  'busdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur'];

  constructor() { }

  ngOnInit() {

    this.message1 = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries";
    // but also the leap into electronic typesetting, remaining essentially unchanged. 
    // It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
    // and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

  }

}
