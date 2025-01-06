"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var clarkHousehold, oCallaghanHousehold, _a, _b, _c, _d, bakery, veg, fruit, meat, cheese, cakes;
        var _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, prisma.household.create({
                        data: {
                            name: "Clark",
                        },
                    })];
                case 1:
                    clarkHousehold = _j.sent();
                    return [4 /*yield*/, prisma.household.create({
                            data: {
                                name: "O'Callaghan",
                            },
                        })];
                case 2:
                    oCallaghanHousehold = _j.sent();
                    _b = (_a = prisma.user).create;
                    _e = {};
                    _f = {
                        householdId: clarkHousehold.id,
                        firstName: "Isaac",
                        lastName: "Clark",
                        username: "isaacclark"
                    };
                    return [4 /*yield*/, bcrypt.hash("password", 10)];
                case 3: return [4 /*yield*/, _b.apply(_a, [(_e.data = (_f.password = _j.sent(),
                            _f.role = "admin",
                            _f),
                            _e)])];
                case 4:
                    _j.sent();
                    _d = (_c = prisma.user).create;
                    _g = {};
                    _h = {
                        householdId: clarkHousehold.id,
                        firstName: "Dominic",
                        lastName: "Clark",
                        username: "domclark"
                    };
                    return [4 /*yield*/, bcrypt.hash("password", 10)];
                case 5: return [4 /*yield*/, _d.apply(_c, [(_g.data = (_h.password = _j.sent(),
                            _h),
                            _g)])];
                case 6:
                    _j.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                householdId: clarkHousehold.id,
                                firstName: "David",
                                lastName: "Clark",
                                username: "davidclark",
                                password: "password",
                            },
                        })];
                case 7:
                    _j.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                householdId: oCallaghanHousehold.id,
                                firstName: "Ruauri",
                                lastName: "O'Callaghan",
                                username: "ruairi",
                                password: "password",
                            },
                        })];
                case 8:
                    _j.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                householdId: oCallaghanHousehold.id,
                                firstName: "Zoe",
                                lastName: "Clark",
                                username: "zoeclark",
                                password: "password",
                            },
                        })];
                case 9:
                    _j.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: {
                                description: "Bakery",
                                householdId: clarkHousehold.id,
                            },
                        })];
                case 10:
                    bakery = _j.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: {
                                description: "Vegetables",
                                householdId: clarkHousehold.id,
                            },
                        })];
                case 11:
                    veg = _j.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: {
                                description: "Fruit",
                                householdId: clarkHousehold.id,
                            },
                        })];
                case 12:
                    fruit = _j.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: {
                                description: "Meat",
                                householdId: oCallaghanHousehold.id,
                            },
                        })];
                case 13:
                    meat = _j.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: {
                                description: "Cheese",
                                householdId: oCallaghanHousehold.id,
                            },
                        })];
                case 14:
                    cheese = _j.sent();
                    return [4 /*yield*/, prisma.category.create({
                            data: {
                                description: "Cakes",
                                householdId: oCallaghanHousehold.id,
                            },
                        })];
                case 15:
                    cakes = _j.sent();
                    return [4 /*yield*/, prisma.masterShoppingList.create({
                            data: {
                                householdId: oCallaghanHousehold.id,
                                masterShoppingListItem: {
                                    create: [
                                        { description: "Whole chicken", categoryId: meat.id },
                                        { description: "Sirloin steaks", categoryId: meat.id },
                                        { description: "Brie", categoryId: cheese.id },
                                        { description: "Chocolate brownies", categoryId: cakes.id },
                                        { description: "Angel cakes", categoryId: cakes.id },
                                    ],
                                },
                            },
                        })];
                case 16:
                    _j.sent();
                    return [4 /*yield*/, prisma.masterShoppingList.create({
                            data: {
                                householdId: clarkHousehold.id,
                                masterShoppingListItem: {
                                    create: [
                                        { description: "Brown bread", categoryId: bakery.id },
                                        { description: "Brocolli", categoryId: veg.id },
                                        { description: "Carrots", categoryId: veg.id },
                                        { description: "Cabbage", categoryId: veg.id },
                                        { description: "Apples", categoryId: fruit.id },
                                    ],
                                },
                            },
                        })];
                case 17:
                    _j.sent();
                    return [4 /*yield*/, prisma.shoppingList.create({
                            data: {
                                householdId: oCallaghanHousehold.id,
                                shoppingListItem: {
                                    create: [
                                        { description: "Whole chicken", categoryId: meat.id, quantity: 5 },
                                        { description: "Sirloin steaks", categoryId: meat.id, quantity: 10 },
                                        { description: "Brie", categoryId: cheese.id },
                                        {
                                            description: "Chocolate brownies",
                                            categoryId: cakes.id,
                                            quantity: 8,
                                        },
                                        { description: "Angel cakes", categoryId: cakes.id, quantity: 4 },
                                    ],
                                },
                            },
                        })];
                case 18:
                    _j.sent();
                    return [4 /*yield*/, prisma.shoppingList.create({
                            data: {
                                householdId: clarkHousehold.id,
                                shoppingListItem: {
                                    create: [
                                        { description: "Brown bread", categoryId: bakery.id },
                                        { description: "Brocolli", categoryId: veg.id, quantity: 3 },
                                        { description: "Carrots", categoryId: veg.id, quantity: 20 },
                                        { description: "Cabbage", categoryId: veg.id },
                                        { description: "Apples", categoryId: fruit.id, quantity: 6 },
                                    ],
                                },
                            },
                        })];
                case 19:
                    _j.sent();
                    console.info("✅ Database seeded");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error("❌ ", e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
