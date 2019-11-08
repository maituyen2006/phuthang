import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './service/spinner.service';
import { HttpClient } from '@angular/common/http';

export class Config {
  ServerUrl?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private readonly apiUrl = './assets/json/config.json';
  loaded = false;

  constructor(public myLoaderService: SpinnerService, private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get(this.apiUrl).subscribe((res: Config) => {
      localStorage.setItem('ServerUrl', res.ServerUrl);
      this.loaded = true;
    });
  }

}
