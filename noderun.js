function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
var duplicateGuid = []
var nodetree = {
    value: "",
    nodetree: []
}

var flatGuidList = [];
var activeGuid = ""

for (var i = 0; i < 100000; i++){
    var a = uuidv4();
    inventoryGuid(a); 
}

var a = duplicateGuid;

function inventoryGuid(a) {
    activeGuid = a;
    var charArray = [...a];
    flatGuidList.push(a);

    var node = getNodeWithValue(charArray, nodetree);

    var otherIndex = nodetree.nodetree.findIndex(z => z.value === node.value);
    if (otherIndex === -1) {
        nodetree.nodetree.push(node);
    } else {
        nodetree.nodetree[otherIndex] = node;
    }
}

function getNodeWithValue(charArray,parentNode) { //should return a node
    var characterToValidate = charArray[0];
    var index = parentNode.nodetree.findIndex(z => z.value===characterToValidate);
    if (index === -1) {
        var newNode = { value: characterToValidate, nodetree: [] }
        if (charArray.length > 1) {
            newNode.nodetree = [getNodeWithValue(charArray.slice(1), newNode)];  
        } 
        return newNode;
    } else {
        if (charArray.length > 1) {
            //apply existing node or add new node
            var node = getNodeWithValue(charArray.slice(1), parentNode.nodetree[index]);
            var otherIndex = parentNode.nodetree[index].nodetree.findIndex(z => z.value === node.value);
            if (otherIndex === -1) {
                parentNode.nodetree[index].nodetree.push(node);
            } else {
                parentNode.nodetree[index].nodetree[otherIndex] = node;
            }
            return parentNode.nodetree[index];
        } else { 
            duplicateGuid.push(activeGuid)
            parentNode.nodetree[index].hasDupe = true;
            return parentNode.nodetree[index];
        }
    }
}