# validate-guid-node

This is a bit of js that can run in node that tests the guid generator function in the file for uniqueness. It makes a bunch of guids using the function (`uuidv4`) and then a second function (`inventoryGuid`) splits each guild into chars and stores those chars in order into a binary tree object asserting that each end of the tree is a unique node. 

If you get much past the 100000 I think it crashes. Not really the most useful thing. But was a fun academic problem. I'm sure someone more mathmatically inclined would have a formula to determine its true randomness with more accuracy. But it was fun to write.
