import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { GlobalService } from './global/global';

@Injectable({
  providedIn: 'root'
})
export class VersionCheckService {
  // this will be replaced by actual hash post-build.js
  private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';

  constructor(private http: HttpClient, private confirmbox: ConfirmationService, private global:GlobalService) { }

  /**
   * Checks in every set frequency the version of frontend application
   * @param url
   * @param {number} frequency - in milliseconds, defaults to 30 minutes
   */

  public initVersionCheck(url, frequency = 1000 * 60 * 30) {
   //  frequency = 0;
   this.checkVersion(url);
    setInterval(() => {
      this.checkVersion(url);
    }, frequency);
  }

  /**
   * Will do the call and check if the hash has changed or not
   * @param url
   */
  private checkVersion(url) {
    // timestamp these requests to invalidate caches
    this.http.get(url + '?t=' + new Date().getTime())
      .subscribe(
        (response: any) => {
          const hash = response.hash;
          const version = response.version;
          console.log(this.currentHash + "," + hash);
          this.global.setVersion(version);
          const hashChanged = this.hasHashChanged(this.currentHash, hash);
          
          // If new version, do something
          if (hashChanged) {
            // ENTER YOUR CODE TO DO SOMETHING UPON VERSION CHANGE
            // for an example: location.reload();
            this.confirmbox.confirm({
              message: 'New update ver. '+ version + ' is ready! Do you want to update application?',
              header: 'New version',
              accept: () => {
                //Actual logic to perform a confirmation
                window.location.reload();
              }
            });
          }
          // store the new hash so we wouldn't trigger versionChange again
          // only necessary in case you did not force refresh
          this.currentHash = hash;
        },
        (err) => {
          console.error(err, 'Could not get version');
        }
      );
  }

  /**
   * Checks if hash has changed.
   * This file has the JS hash, if it is a different one than in the version.json
   * we are dealing with version change
   * @param currentHash
   * @param newHash
   * @returns {boolean}
   */
  private hasHashChanged(currentHash, newHash) {
    if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
      return false;
    }

    return currentHash !== newHash;
  }
}