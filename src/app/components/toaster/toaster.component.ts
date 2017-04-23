import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from '../../services/push-notification.service';

@Component({
  selector: 'sb-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  providers: [PushNotificationService]
})
export class ToasterComponent implements OnInit {

  Notification:any = null;
  accessInfo:string = null;
  showToaster:boolean = false;
  constructor(private PushNotificationService: PushNotificationService) { 
  	this.Notification = Notification;
  }

  ngOnInit() {
  	this.accessInfo = this.getSubscription();
  	if(this.accessInfo !== "granted"){
  		this.showToaster = true;
  	}else{
  		this.showToaster = false;
  	}
  }
  	/**
     * @name dismissToaster
     * @desc Hides Toaster
     */
    dismissToaster() {
    	this.showToaster = false;
    }

    /**
     * @name getSubscription
     * @desc Checks for notification permission
     */
    getSubscription() {
   		return this.Notification.permission;
    }

    /**
     * @name showNotificationDialog
     * @description Shows notification dialog if access is not granted yet
     */
    showNotificationDialog() {
    	this.PushNotificationService.requestNotificationService()
    	this.showToaster = false;
    }


}
