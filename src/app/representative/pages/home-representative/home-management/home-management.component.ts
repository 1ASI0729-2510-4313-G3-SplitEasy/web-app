import {AfterViewInit, Component, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {Home} from '../../../model/home.entity';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {HomeService} from '../../../service/home.service';
import {HomeCreateAndEditComponent} from '../../../component/home-create-and-edit/home-create-and-edit.component';
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-home-management',
  standalone: true,
  imports: [
    HomeCreateAndEditComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderCell,
    MatCell,
    MatIcon,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatSortHeader
  ],
  templateUrl: './home-management.component.html',
  styleUrl: './home-management.component.css'
})
export class HomeManagementComponent implements OnInit, AfterViewInit {

  @Output() homesChanged = new EventEmitter<void>();

  /** Current course being created or edited */
  protected homeData!: Home;

  /**
   * Component responsible for managing courses through a table interface.
   * Provides functionality for viewing, creating, updating, and deleting courses.
   * Features include pagination, sorting, and integrated CRUD operations.
   */

  /** Defines which columns should be displayed in the table and their order */
  protected columnsToDisplay: string[] = ['id', 'title', 'description', 'actions'];

  /** Reference to the Material paginator for handling page-based data display */
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;

  /** Reference to the Material sort directive for handling column sorting */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Controls whether the component is in edit mode */
  protected editMode: boolean = false;

  /** Material table data source for managing and displaying course data */
  protected dataSource!: MatTableDataSource<any>;

  /** Service for handling course-related API operations */
  private homeService: HomeService = inject(HomeService);

  //#endregion

  //#region Methods

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.editMode = false;
    this.homeData = new Home({});
    this.dataSource = new MatTableDataSource();
    console.log(this.homeData);
  }

  ngOnInit(): void {
    this.getAllHomes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Handles the edit action for a course
   * @param item - The course to be edited
   */
  protected onEditItem(item: Home) {
    this.editMode = true;
    this.homeData = item;
  }

  protected onDeleteItem(item: Home) {
    this.deleteHome(item.id);
  }

  /**
   * Handles the cancellation of create/edit operations.
   * Resets the component state and refreshes the course list.
   */
  protected onCancelRequested() {
    this.resetEditState();
    this.getAllHomes();
  }

  protected onHomeAddRequested(item: Home) {
    this.homeData = item;
    this.createHome();
    this.resetEditState();
  }

  protected onHomeUpdateRequested(item: Home) {
    this.homeData = item;
    this.updateHome();
    this.resetEditState();
  }
  /**
   * Resets the component's edit state to its default values.
   * Clears the current course data and exits edit mode.
   */
  private resetEditState(): void {
    this.homeData = new Home({});
    this.editMode = false;
  }

  /**
   * Retrieves all courses from the service and updates the table's data source.
   * Uses homeService to fetch the data via HTTP.
   */
  private getAllHomes() {
    this.homeService.getAll().subscribe((response: Array<Home>) => {
      this.dataSource.data = response;
    });
  }

  private createHome() {
    this.homeService.create(this.homeData).subscribe((response: Home)=> {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
      this.homesChanged.emit();
    });
  }

  private updateHome() {
    let homeToUpdate = this.homeData;
    this.homeService.update(homeToUpdate.id, homeToUpdate).subscribe((response: Home) => {
      let index = this.dataSource.data.findIndex((home: Home) => home.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
      this.homesChanged.emit();
    });
  }
  private deleteHome(id: string) {
    this.homeService.delete(id).subscribe(() => {
      let newData = this.dataSource.data.filter((home: Home) => home.id !== id);
      this.dataSource.data = newData;
      this.homesChanged.emit();
    })
  }

  //#endregion
}
