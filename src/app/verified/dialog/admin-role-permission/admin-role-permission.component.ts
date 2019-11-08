import { Component, OnInit, ViewChild, Inject, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { AdminModuleService } from 'src/app/service/admin-module.service';
import { MatTreeNestedDataSource, MAT_DIALOG_DATA, MatSnackBar, MatCheckbox, MatDialogRef } from '@angular/material';
import { AdminModule } from 'src/app/class/admin-module';
import { NestedTreeControl } from '@angular/cdk/tree';
import { AdminRoleService } from 'src/app/service/admin-role.service';
import { AdminRole } from 'src/app/class/admin-role';

@Component({
  selector: 'app-admin-role-permission',
  templateUrl: './admin-role-permission.component.html',
  styleUrls: ['./admin-role-permission.component.scss']
})
export class AdminRolePermissionComponent implements OnInit {

  TREE_DATA = [];
  selectedIDs = [];
  treeControl = new NestedTreeControl<AdminModule>(node => node.children);
  @ViewChildren('moduleID') moduleIDs: QueryList<MatCheckbox>;
  dataSource = new MatTreeNestedDataSource<AdminModule>();
  @ViewChild('tree') tree;
  constructor(private adminModuleService: AdminModuleService,
    private adminRoleService: AdminRoleService, public dialogRef: MatDialogRef<AdminRolePermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
    let role = data['role'] as AdminRole;
    if (role.moduleIDs) {
      this.selectedIDs = role.moduleIDs.split(',').map(item => parseInt(item, 10));
    }
  }

  ngOnInit() {
    this.adminModuleService.getAllAvaiableModule().subscribe(res => {
      this.TREE_DATA = res['data'];
      let sourceData = this.buildTreeData(null);
      this.dataSource.data = sourceData;
      this.treeControl.dataNodes = sourceData;
      this.tree.treeControl.expandAll();
    });
  }

  private buildTreeData(parentId: number): any[] {
    var childrens = this.TREE_DATA.filter(leaf => {
      return leaf.parentId == parentId || (leaf.parentId && leaf.parentId.id == parentId);
    })
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

  getChecked(id: number) {
    return this.selectedIDs.indexOf(id) >= 0;
  }

  save() {
    const ids = [];
    const urls = [];
    this.moduleIDs.forEach(checkbox => {
      if (checkbox.checked) {
        ids.push(checkbox.id);
        if (checkbox.value) {
          urls.push(checkbox.value);
        }
      }
    });
    const role = this.data['role'] as AdminRole;
    role.moduleIDs = ids.join(',');
    role.moduleUrls = urls.join(',');
    this.adminRoleService.edit(role).subscribe(res => {
      if (res["success"]) {
        this.snackBar.open(res["message"], 'Đóng', {
          panelClass: ['style-success'],
          duration: 2500
        });
      } else {
        this.snackBar.open(res["message"], 'Đóng', {
          panelClass: ['style-error'],
          duration: 2500
        });
      }
    });
  }
}
