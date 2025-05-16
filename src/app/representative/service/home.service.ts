import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/service/base.service';
import {Home} from '../model/home.entity';
import {environment} from '../../../environments/environment';

const homesResourceEndpointPath = environment.homesEndpoint;
@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService<Home>{

  constructor() {
    super();
    this.resourceEndpoint = homesResourceEndpointPath;
  }
}
