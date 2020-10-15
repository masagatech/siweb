import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-uploader',
    templateUrl: './uploader.component.html',
    styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
    files: any[] = [];
    @Output() onUpload: EventEmitter<any> = new EventEmitter();
    @Input('multipleUpload') multipleUpload: boolean = true;
    @Input('isEdit') isEdit: boolean = false;
    @Input('fileData') fileData: any = [];

    @ViewChild('fileDropRef') fileDropRef: ElementRef;

    noOfUpload = 1;

    ngOnInit() {
        if (this.isEdit) {
            this.files = this.fileData;
            if (this.files.length > -1) {
                this.noOfUpload = 2;
            }
        }
    }


    /**
     * on file drop handler
     */
    onFileDropped($event) {
        if (!this.multipleUpload && this.noOfUpload !== 1) return;
        this.prepareFilesList($event);
        this.noOfUpload = 2;
    }

    /**
     * handle file from browsing
     */
    fileBrowseHandler(files) {
        if (!this.multipleUpload && this.noOfUpload !== 1) return;
        this.prepareFilesList(files);
        this.noOfUpload = 2;
    }

    /**
     * Delete file from files list
     * @param index (File index)
     */
    deleteFile(index: number) {
        if (!this.multipleUpload) {
            this.noOfUpload = 1;
            this.fileDropRef.nativeElement.value = '';
        }
        this.files.splice(index, 1);
    }

    /**
     * Simulate the upload process
     */
    uploadFilesSimulator(index: number) {
        setTimeout(() => {
            if (index === this.files.length) {
                return;
            } else {
                const progressInterval = setInterval(() => {
                    if (this.files[index].progress === 100) {
                        clearInterval(progressInterval);
                        this.uploadFilesSimulator(index + 1);
                    } else {
                        this.files[index].progress += 5;
                    }
                }, 200);
            }
        }, 1000);
    }

    /**
     * Convert Files list to normal array list
     * @param files (Files List)
     */
    prepareFilesList(files: Array<any>) {
        for (const item of files) {
            item.progress = 0;
            this.files.push(item);
        }
        this.onUpload.emit(this.files);
        this.uploadFilesSimulator(0);
    }

    /**
     * format bytes
     * @param bytes (File size in bytes)
     * @param decimals (Decimals point)
     */
    formatBytes(bytes, decimals) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
