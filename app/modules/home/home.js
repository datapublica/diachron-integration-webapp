export default class HomeController {
    constructor(datasets) {
		var ctrl = this;
		ctrl.selectedItem = null;
		ctrl.selectedVersion = null;
		ctrl.datasets = datasets;
		ctrl.selectVersion = (item, version) => {
			if (ctrl.selectedVersion) {
				ctrl.selectedVersion.selected = false;
			}
			if (ctrl.selectedItem) {
				ctrl.selectedItem.selected = false;
			}
			version.selected = true;
			ctrl.selectedVersion = version;
			ctrl.selectedItem = item;
		};
		ctrl.toggle = (item) => {
			item.expanded = !item.expanded;
		}
    }
}