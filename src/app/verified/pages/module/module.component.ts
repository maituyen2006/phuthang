import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { AdminModule } from 'src/app/class/admin-module';
import { AdminModuleService } from 'src/app/service/admin-module.service';
import { AdminModuleInsertComponent } from '../../dialog/admin-module-insert/admin-module-insert.component';
import { ConfirmComponent } from '../../dialog/confirm/confirm.component';


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  TREE_DATA = [];
  treeControl = new NestedTreeControl<AdminModule>(node => node.children);
  dataSource = new MatTreeNestedDataSource<AdminModule>();
  @ViewChild('tree') tree;
  constructor(private adminModuleService: AdminModuleService,
    private snackBar: MatSnackBar, private dialog: MatDialog) {

  }

  ngOnInit() {
    this.reload();
  }
  reload() {
    this.adminModuleService.getAllAvaiableModule().subscribe(res => {
      this.TREE_DATA = res['data'];
      const sourceData = this.buildTreeData(null);
      this.dataSource.data = sourceData;
      this.treeControl.dataNodes = sourceData;
      this.tree.treeControl.expandAll();
    });
  }

  private buildTreeData(parentId: number): any[] {
    const childrens = this.TREE_DATA.filter(leaf => {
      return leaf.parentId === parentId || (leaf.parentId && leaf.parentId.id == parentId);
    });
    childrens.forEach(leaf => {
      leaf['children'] = this.buildTreeData(leaf['id']);
    });
    return childrens;
  }

  private transformer = (node: AdminModule, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  hasChild = (_: number, node: AdminModule) => !!node.children && node.children.length > 0;

  insert(parentID: number) {
    const dialogRef = this.dialog.open(AdminModuleInsertComponent, {
      width: '600px',
      data: { parent: this, parentID: { id: parentID } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.reload();
      }
    });
  }
  edit(module: any) {
    const dialogRef = this.dialog.open(AdminModuleInsertComponent, {
      width: '600px',
      data: { parent: this, 'module': module, 'isEdit': true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.reload();
      }
    });
  }
  block(id: number) {
    this.adminModuleService.block(id).subscribe(data => {
      this.reload();
      if (data["success"]) {
        this.snackBar.open(data["message"], 'Đóng', {
          panelClass: ['style-success'],
          duration: 2500
        });
      } else {
        this.snackBar.open(data["message"], 'Đóng', {
          panelClass: ['style-error'],
          duration: 2500
        });
      }
    });
  }
  delete(id: number) {
    if (confirm('Bạn chọn xóa module. Bạn muốn tiếp tục?')) {
      this.adminModuleService.delete(id).subscribe(data => {
        this.reload();
        if (data["success"]) {
          this.snackBar.open(data["message"], 'Đóng', {
            panelClass: ['style-success'],
            duration: 2500
          });
        } else {
          this.snackBar.open(data["message"], 'Đóng', {
            panelClass: ['style-error'],
            duration: 2500
          });
        }
      });
    }
  }
}
