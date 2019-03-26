import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header-template",
  templateUrl: "./header-template.component.html",
  styleUrls: ["./header-template.component.scss"]
})
export class HeaderTemplateComponent implements OnInit {
  selectedLanguage = "en";
  constructor() {}

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem("locale");
  }

  changeLang(lang: string) {
    if (lang === localStorage.getItem("locale")) {
      return;
    }
    if (lang === "en") {
      localStorage.setItem("locale", "en");
    } else if (lang === "fr") {
      localStorage.setItem("locale", "fr");
    } else {
      localStorage.setItem("locale", "es");
    }
    window.location.reload();
  }
}
