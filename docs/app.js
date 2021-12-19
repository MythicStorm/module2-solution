(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyController = this;
        buyController.buyListEmpty = false;
        var minItems = 0;
        
        buyController.shoppingList = ShoppingListCheckOffService.getShoppingList();
        
        buyController.removeShoppingListItem = function(itemIndex) {
            buyController.buyListEmpty =  ShoppingListCheckOffService.removeShoppingListItem(itemIndex, minItems);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtController = this;
        var minItems = 0;

        boughtController.shoppingList = ShoppingListCheckOffService.getBoughtShoppingList(minItems);
        
        boughtController.checkNoBoughtItemsMessageDisplayed = function(){
            return ShoppingListCheckOffService.checkBoughtListMinItems(minItems);
        };    
    }
    
    function ShoppingListCheckOffService() {
        var service = this;

        var shoppingList = [
            {
              name: "Milk",
              quantity: "1"
            },
            {
              name: "Donuts",
              quantity: "5"
            },
            {
              name: "Cookies",
              quantity: "20"
            },
            {
              name: "Chocolate",
              quantity: "10"
            },
            {
              name: "Chips",
              quantity: "15"
            }
          ];

          var boughtShoppingList = [];

        service.addBoughtShoppingListItem = function(itemName, itemQuantity){
            var ShoppingList = {
                name: itemName,
                quantity: itemQuantity
            };

            boughtShoppingList.push(ShoppingList);
        };

        service.removeShoppingListItem = function(itemIndex, minItems) {
            service.addBoughtShoppingListItem(shoppingList[itemIndex].name, shoppingList[itemIndex].quantity)
            shoppingList.splice(itemIndex, 1);
            return service.checkShoppingListMinItems(minItems);
        };
        
        service.checkShoppingListMinItems = function(minItems) {
            if (minItems === undefined ||
                (minItems !== undefined && shoppingList.length > minItems)) {
                return false;
            } 
            else {
                return true;
            }
        };

        service.checkBoughtListMinItems = function(minItems) {
            if (minItems === undefined ||
                (minItems !== undefined && boughtShoppingList.length > minItems)) {
                return false;
            } 
            else {
                return true;
            }
        };

        service.getShoppingList = function () {
            return shoppingList;
        };

        service.getBoughtShoppingList = function () {
            return boughtShoppingList;
        }
    }

    })();