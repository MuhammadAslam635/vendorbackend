"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageModule = void 0;
const common_1 = require("@nestjs/common");
const package_service_1 = require("./package.service");
const package_controller_1 = require("./package.controller");
const roles_guard_1 = require("../auth/roles-guard");
const core_1 = require("@nestjs/core");
let PackageModule = class PackageModule {
};
exports.PackageModule = PackageModule;
exports.PackageModule = PackageModule = __decorate([
    (0, common_1.Module)({
        controllers: [package_controller_1.PackageController],
        providers: [package_service_1.PackageService, {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            }],
    })
], PackageModule);
//# sourceMappingURL=package.module.js.map