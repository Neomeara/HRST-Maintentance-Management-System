"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newList = void 0;
function newList(group, title, ApplicationUser) {
    var newList = {
        maintenanceListId: 1,
        applicationUser: ApplicationUser,
        applicationUserId: ApplicationUser.id,
        title: title,
        group: group,
        creationDate: new Date(),
        lastEditDate: new Date(),
        listItems: []
    };
    return newList;
}
exports.newList = newList;
//# sourceMappingURL=MaintenanceList.js.map