(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyController = this;
        
        buyController.shoppingList = ShoppingListCheckOffService.getShoppingList();
        
        buyController.removeShoppingListItem = function(itemIndex) {
            ShoppingListCheckOffService.removeShoppingListItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtController = this;

        boughtController.shoppingList = ShoppingListCheckOffService.getBoughtShoppingList();
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

        service.removeShoppingListItem = function(itemIndex) {
            service.addBoughtShoppingListItem(shoppingList[itemIndex].name, shoppingList[itemIndex].quantity)
            shoppingList.splice(itemIndex, 1);
        };
        
        service.getShoppingList = function () {
            return shoppingList;
        };

        service.getBoughtShoppingList = function () {
            return boughtShoppingList;
        }
    }

    })();