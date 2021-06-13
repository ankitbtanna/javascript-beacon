import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'javascript-beacon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  timeSpent = 0;
  fromDate = new Date();
  currentImageId = 1;
  maxImages = 10;

  ngOnInit() {
    this.updateTime();
  }

  sendAnalytics(content: unknown) {
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json; charset=UTF-8',
    });
    navigator.sendBeacon('/api/analytics', blob);
  }

  updateTime() {
    const toDate = new Date();
    this.timeSpent = toDate.getTime() - this.fromDate.getTime();
    setTimeout(this.updateTime.bind(this), 100);
  }

  next() {
    if (this.currentImageId === this.maxImages) {
      return;
    }
    
    // Prepare data for analytics
    const data: { [kay: string]: number } = {};
    data[`image-${this.currentImageId.toString()}`] = this.timeSpent;
    this.sendAnalytics(data);

    this.currentImageId++;
  }

  previous() {
    if (this.currentImageId === 1) {
      return;
    }

    // Prepare data for analytics
    const data: { [kay: string]: number } = {};
    data[`image-${this.currentImageId.toString()}`] = this.timeSpent;
    this.sendAnalytics(data);

    this.currentImageId--;
  }

  resetTime() {
    this.fromDate = new Date();
  }
}
