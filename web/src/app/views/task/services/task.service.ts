import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Task } from "../models/task";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  nocache_headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "Sat, 01 Jan 2000 00:00:00 GMT",
    Authorization: "",
    "Content-Type": ""
  };

  constructor(private http: HttpClient) {}

  getProjectByCode = (id: string): Observable<Task> => {
    return this.http
      .get(`${environment.API_Gateway_Base}/${id}`)
      .pipe(map((task: Task) => task));
  };
  getTasks = () => {
    return this.http.get(`${environment.API_Gateway_Base}/tasks`, {
      headers: this.nocache_headers
    });
  };

  // getTasks = () => {
  //   return new Promise((resolve, reject) => {
  //     let apiURL = `${environment.API_Gateway_Base}/tasks`;
  //     this.http
  //       .get(apiURL, { headers: this.nocache_headers })
  //       .toPromise()
  //       .then(res => {
  //         // Success
  //         console.log(res);
  //         resolve();
  //       });
  //   });
  // };

  saveTask = (task: Task) => {
    return this.http.post(`${environment.API_Gateway_Base}/tasks`, task);
  };
}
