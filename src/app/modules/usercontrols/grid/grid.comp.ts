import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { GlobalService } from '../../../services/global/global';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastService } from '../../../services/other/toast-service';
import { GridService } from '../../../services/grid/grid.service';
import { DataTable } from 'primeng/primeng';
import { AdvanceSearchComponent } from '../advancesearch/advancesearch.comp';
import { AdvancesearchService } from '../../../services/advancesearch.service';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.comp.html',
    styleUrls: ['grid.comp.scss'],
    providers: [GridService, AdvancesearchService]
})
export class GridComponent implements OnInit, AfterViewInit {
    // @Output() onEdit: EventEmitter<any> = new EventEmitter;
    @Output() onAction: EventEmitter<any> = new EventEmitter;
    @Output() onLinkClick: EventEmitter<any> = new EventEmitter;
    @Input('controlName') controlName: String = '';
    @Input('styles') styles: any = [];

    @Input('api') api: any = '';
    @Input('isAdvanceSearch') isAdvanceSearch: boolean = false;
    @Input('apiFlag') apiFlag: any = 0;
    @Input('params') params: any = 0;
    @Input('actionButtons') actionButtons: any = [];
    @ViewChild('dataTable') dataTable: DataTable;
    @ViewChild('template') template;
    @ViewChild('template') popupContainer;
    @ViewChild('advt') advt: AdvanceSearchComponent;

    modalRef: BsModalRef;
    tableProperty: any;
    cols: any = [];
    cols_m: any = [];
    gridData: any = [];
    totalRecords: any = 0;
    selectedColumns: any = [];
    fixedColumns: any = [];
    sortColumn: any = [];
    getTotalRecords: number = 1;
    menuAccess: any = [];
    allowedAction: any = [];
    isLoading = true;
    /** General setting formats */
    dateformat: string = 'dd-mm-yyyy';
    decimalformat: any = 2;
    inputFilter: any = { column_name: '', keyword: '', sign: '=', extra: { search: '=' }, show: true };
    actionWidth: any = 0;
    frozenCols: any = [];
    notFixedColLen: number;
    caseCols: any = {};
    showDDL: any = false;
    dataList: any = [];


    constructor(private global: GlobalService, private modalService: BsModalService, private message: ToastService, private translate: TranslateService, private gridservice: GridService, private filterService: AdvancesearchService) {
        translate.use(global.getLang());
    }


    ngOnInit(): void {

        //this.menuAccess = this.global.getMenuActions();
        this.menuAccess = 'add,view,edit,filter,export,editProfile,preview'.split(',');
        this.cols = this.bindColumns();
        this.dateformat = this.global.getEnvData().dateformat;
        this.decimalformat = this.global.getEnvData().decimal;
        this.advt.currentGridView = this.controlName; //10719
        this.actionButtons = this.actionButtons.filter((a) => {
            let isrequired = a.isrequired || false; // Not added in menus. used for role module.
            if (!isrequired) {
                if (this.menuAccess && this.menuAccess != '') {
                    return this.menuAccess.find((b) => {
                        return b == a.id;
                    });
                }
            }
            else {
                return a;
            }

        });
        this.actionWidth = 0;
        this.actionButtons.forEach(a => {
            this.actionWidth += (this.global.btnStyle === this.global.btnStyleSource.icononly ? 46 : (a.width || 60));
        });

        if (this.actionButtons.length == 1) {
            //this.actionWidth = (this.global.btnStyle === this.global.btnStyleSource.icononly ? 55 : (this.actionButtons[0].width || 60));
            this.actionWidth = 55;
        }
        else {
            // this.actionWidth += 55;
        }



    }

    ngAfterViewInit() {
        this.tableProperty = this.dataTable;
    }

    bindGrid(event) {
        try {
            this.selectedColumns.sort((a, b) => {
                return a.column_order - b.column_order;
            });
            if (this.cols !== undefined && this.cols.length > 0) {
                event.cols = this.buildCols(this.selectedColumns);
                console.log(event.cols);
                event.case = this.caseCols;
                event.filters = this.advt.format_filter_data();

                if (event.multiSortMeta == null && this.sortColumn.length > 0) {
                    event.multiSortMeta = this.sortColumn;
                }

                //CHINMAY CODE 
                // if keyword contacins ' then replaced it. and stored into "trimmedKeyword"

                let trimmedKeyword = this.inputFilter.keyword;
                if (this.inputFilter.keyword != undefined) {
                    trimmedKeyword = this.inputFilter.keyword.replace(/'/g, "\\'");
                }

                //END CHINMAY CODE

                event.masterid = this.global.getDisp();
                event.inputFilter = {
                    'column_name': this.inputFilter.column_name,
                    'keyword': trimmedKeyword,


                    'sign': (this.inputFilter.extra.search || '=')
                }
                // * usertype(isadmin)
                this.gridservice.bindGrid(this.api, {
                    'operate': 'grid',
                    'filter': event,
                    'geotype': this.apiFlag,
                    'getTotalRecordsFlg': this.getTotalRecords,
                    'userid': this.global.getUser().id,
                    'params': this.params
                    // ,
                    // 'usertype': this.global.getUser().isadmin,
                    // 'isglobal': this.global.getUser().isglobal
                }).subscribe((res: any) => {

                    if (res.resultKey === 1) {
                        this.gridData = res.resultValue[0];
                        if (this.getTotalRecords === 1) {
                            this.totalRecords = res.resultValue[1];
                        }
                        this.getTotalRecords = 0;
                    }
                    else if (res.resultKey === 0) {
                        this.message.show('error', res.defaultError, 'error', this.translate)
                    }
                }, (error: any) => {
                    this.message.show('error', 'No records avaliable', 'error', this.translate);
                }, () => {
                    this.isLoading = false;
                });
            }
        }
        catch (Ex) {
            this.message.show('error', Ex, 'error', this.translate);
        }
    }


    getDataOnSelectedColumns() {
        this.getTotalRecords = 0;
        this.tableProperty.first = 0;
        let request = {
            first: this.tableProperty.first,
            rows: this.tableProperty.rows,
            cols: this.buildCols(this.selectedColumns),
            case: this.caseCols,
            sortField: this.tableProperty.sortField,
            sortOrder: this.tableProperty.sortOrder,
            filters: this.advt.format_filter_data(),

        };
        this.bindGrid(request);
    }

    public RefreshGrid() {
        this.getTotalRecords = 1;
        this.tableProperty.first = 0;
        let request = {
            first: this.tableProperty.first,
            rows: this.tableProperty.rows,
            cols: this.buildCols(this.selectedColumns),
            case: this.caseCols,
            sortField: this.tableProperty.sortField,
            sortOrder: this.tableProperty.sortOrder,
            filters: this.advt.format_filter_data(),
        };
        this.bindGrid(request);
    }


    buildCols(cols) {
        let column = [];
        let fixedcolumns = [];
        let finalcolumn = [];
        this.caseCols = {};
        column = cols.map((a) => {
            if (a.extra && a.extra.case) {
                this.caseCols[a.column_name] = a.extra.case;
            }
            return a.column_name;
        });
        fixedcolumns = this.fixedColumns.map((a) => {
            if (a.extra && a.extra.case) {
                this.caseCols[a.column_name] = a.extra.case;
            }
            return a.column_name;
        });
        column = column.filter((v, i, a) => a.indexOf(v) === i);
        finalcolumn = column.concat(fixedcolumns);
        this.notFixedColLen = column.length;
        return JSON.stringify(finalcolumn);
    }


    buildColsForExport(cols) {
        let column = [];
        let fixedcolumns = [];
        let finalcolumn = [];
        column = cols.map((a) => {
            return a.column_name;
        });
        finalcolumn = column;
        return JSON.stringify(finalcolumn);
    }

    buildColsLabel(): any {
        let colname = '';
        for (let a of this.cols) {
            colname += '"' + a.column_name + '":"' + a.column_label + '",';
        }
        return '{' + colname.substring(0, colname.length - 1) + '}';
    }
    inputFilterArr = [];
    inputFilterCol = '';
    bindColumns() {
        try {
            this.gridservice.getColumns({
                'module': this.controlName
            }).subscribe((res: any) => {
                if (res.resultKey === 1) {
                    let fixedColumns = [];
                    let sortColumn = undefined;

                    this.cols_m = res.resultValue;

                    this.cols = [];
                    // this.cols = res.resultValue.filter((a) => {
                    //     return a.ishidden === 0;
                    // });

                    // this.selectedColumns = res.resultValue.filter((a) => {
                    //     return a.defaultselected === 1 && a.ishidden === 0;
                    // });


                    // sortColumn = res.resultValue.filter((a) => {

                    //     if( a.issort){

                    //     }

                    //     return a.issort === 1;
                    // });
                    for (let index = 0; index < res.resultValue.length; index++) {
                        const el = res.resultValue[index];
                        // check fixed selected
                        if (el.fixedSelected == 1) {
                            fixedColumns.push(el);
                        }
                        // check selected columns
                        if (el.defaultselected === 1 && el.ishidden === 0) {
                            this.selectedColumns.push(el);
                        }

                        // check hidden column
                        if (el.ishidden === 0) {
                            this.cols.push(el);
                        }

                        // add sort column
                        if (el.issort) {
                            try {
                                this.sortColumn.push(
                                    {
                                        'field': el.column_name, 'order': (el.extra.sort[1] == 'ASC' ? -1 : 1),
                                        'seq': el.extra.sort[0]
                                    });
                            } catch (error) {

                            }

                        }
                    }
                    this.inputFilterArr = res.resultValue.filter((a) => {
                        return a.isfilter === 1;
                    });
                    // order by column
                    console.log(this.inputFilterArr);
                    this.cols.sort((a, b) => {
                        return a.column_order - b.column_order;
                    });
                    if (this.sortColumn) {
                        this.sortColumn.sort((a, b) => {
                            return a.seq - b.seq;
                        });
                    }


                    // fixedColumns = res.resultValue.filter((a) => {
                    //     return a.fixedSelected === 1;
                    // });


                    if (fixedColumns.length > 0) {
                        this.fixedColumns = fixedColumns;
                    }
                    else {
                        this.message.show('error', 'Fixed column for grid is missing', 'error', this.translate);
                    }

                    // if (sortColumn.length > 0) {
                    //     this.sortColumn = sortColumn[0].column_name;
                    // }
                    // else {
                    //     this.sortColumn = 'id';
                    // }




                    if (this.inputFilterArr.length > 0) {
                        
                        this.inputFilter = this.inputFilterArr.find((a) => {
                            return a.searchSelected == 1;
                        }) || this.inputFilterArr[0];
                        this.inputFilterCol = this.inputFilter.column_name;
                        this.inputFilter['keyword'] = '';
                        this.showDDL = false;
                        if (this.inputFilter.datatype == 'ddl') {
                            this.showDDL = true;
                            this.filterService.getDatasource({ 'datasource': this.inputFilter.extra.datasource }).subscribe((res: any) => {
                                if (res.resultKey === 1) {
                                    this.dataList = res.resultValue;
                                }
                            });
                        }
                        this.inputFilter.show = true;
                    }
                    else {
                        this.inputFilter.show = false;
                    }


                    // this.frozenCols.push(res.resultValue.find((a) => {
                    //     return a.column_name == 'id';
                    // }));
                    //this.frozenCols.push({field:'action',header:'Action'});
                    this.dataTable.reset();

                }
            }, (err) => {
                this.message.show('error', err, 'error', this.translate);
            });
        } catch (error) {
            this.message.show('error', error, 'error', this.translate);
        }
    }

    onFilterColChange(event) {
        this.inputFilter = this.inputFilterArr.find((a) => {
            return a.column_name == event.target.value;
        });
        if (this.inputFilter !== undefined) {
            this.inputFilter['keyword'] = '';
            this.showDDL = false;
            if (this.inputFilter.datatype == 'ddl') {
                this.showDDL = true;
                this.filterService.getDatasource({ 'datasource': this.inputFilter.extra.datasource }).subscribe((res: any) => {
                    if (res.resultKey === 1) {
                        this.dataList = res.resultValue;
                    }
                });
            }
            //this.showDDL = (this.inputFilter.datatype == 'ddl') ? true : false;
        }
        this.inputFilter.show = true;
    }

    onAdvanceSearch(event) {
        this.getTotalRecords = 1;
        this.tableProperty.first = 0;
        let request = {
            first: this.tableProperty.first,
            rows: this.tableProperty.rows,
            cols: this.buildCols(this.selectedColumns),
            case: this.caseCols,
            sortField: this.tableProperty.sortField,
            sortOrder: this.tableProperty.sortOrder,

            filters: event
        };
        this.bindGrid(request);
        this.advt.closeModal();
    }


    openModal(content: string) {
        this.modalRef = this.modalService.show(this.popupContainer);
    }

    export() {
        try {
            this.global.showLoader('Loading');
            this.tableProperty.first = 0;
            let request = {
                first: this.tableProperty.first,
                rows: this.tableProperty.rows,
                cols: this.buildColsForExport(this.cols),
                case: this.caseCols,
                colsLabel: this.buildColsLabel(),
                sortField: this.tableProperty.sortField,
                sortOrder: this.tableProperty.sortOrder
            };
            this.gridservice.export(this.api, {
                'type': 'export',
                'filter': request,
                'geotype': this.apiFlag,
                'userid': this.global.getUser().id
                // ,
                // 'usertype': this.global.getUser().isadmin,
                // 'isglobal': this.global.getUser().isglobal
            }).subscribe((res: any) => {
                if (res.resultKey === 1) {
                    //window.location.href = res.resultValue;
                    let win = window.open(res.resultValue, '_blank');
                    win.focus();
                } else if (res.resultKey === 0) {
                    this.message.show('error', res.defaultError, 'error', this.translate)
                }
            }, (error: any) => {
                this.message.show('error', error, 'error', this.translate);
            })
        } catch (error) {
            this.message.show('error', error, 'error', this.translate);
        }
    }

    _onAction(act, data) {
        this.onAction.emit([act, data]);
    }

    oncreate(a, rowData) {
        if (a.oncreate) {
            a.oncreate(a, rowData);
        }
    }

    onInputFilter() {
        this.getTotalRecords = 1;
        this.tableProperty.first = 0;
        let request = {
            first: this.tableProperty.first,
            rows: this.tableProperty.rows,
            cols: this.buildCols(this.selectedColumns),
            case: this.caseCols,
            sortField: this.tableProperty.sortField,
            sortOrder: this.tableProperty.sortOrder,
        };
        if (this.notFixedColLen == 0) {
            this.message.showTranslate('error', 'min_col_in_grid', 'error', this.translate);
            return false;
        }
        this.bindGrid(request);
    }

    clearfilter() {
        this.inputFilter.keyword = '';
        this.advt.clearfilter();
    }

    openWindow(columnName, data) {
        switch (columnName) {
            case 'ndadoc': window.open(this.global.getConfig().document_path + "/" + data[columnName], "_blank", "");
                break;
            case 'sequenceid': this.onLinkClick.emit([columnName, data]);
                break;
        }
    }

    insert(data) {
        data.isnew = true;
        // if (anywhere) {
        //     this.gridData.push(data);
        // } else {
        this.gridData.unshift(data);

        //}
        this.totalRecords += 1;
    }
}
