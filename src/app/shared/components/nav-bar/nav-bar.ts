import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  isLight = false;

  toggleTheme() {
    this.isLight = !this.isLight;
    document.body.classList.toggle('light-theme');
  }
}
