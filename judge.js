// Judging outputs

// In setup I have:
// j = new Judge();


// Keys 1-3 score an output and load a new one
// Key d creates and downloads the csv
function keyPressed(){
  if (key == 1 || key == 2 || key == 3){
    j.keyPressed(key);
    loadNew();
  }
  if (key == 'd'){
    j.makeCSV();
  }
}

class Judge{
  constructor(){
    // Set up variables inside the class to hold the scores for various different settings
    // I've cut it down so only two settings are included, for clarity.

    // These are all the different ways the nodes can be layed out
    let nodeLayouts = ["scattered", "h lines", "v lines", "h path", "v path", "ring", "two rings"];

    // The object contains an array, with one item for each layout,
    // each item has variables to add up how many '1's, how many '2's and how many '3's are recorded
    // for that layout
    this.nodeLayouts = [];
    for(let l of nodeLayouts){
      this.nodeLayouts.push( {
        name: l,
        test: l,
        _1 : 0,
        _2 : 0,
        _3 : 0
      });
    }

    // These are all the options for extra features that an output can have
    // Array set up same as above
    let extras = ["outline", "circles", "localRotate", "expand", "rotate", "mirror"]
    this.extras = [];
    for(let e of extras){
      this.extras.push({
        name: e,
        test: e,
        _1 : 0,
        _2 : 0,
        _3 : 0
      });
    }

  }

  // This is called when the key is pressed
  keyPressed(key){
    // Have to add a _ to the keypress (1,2 or 3) so it matches the variable name, as variable names can't start with numbers
    let k = "_" + key;

    // Goes through all the node layouts and checks if this output has that node layout
    for(let n of this.nodeLayouts){
      if (n.test == sx.nodes.layout){
        // if it does, then add 1 to the relevant score count
        n[k]++;
      }
    }

    // Same for extras
    for(let e of this.extras){
      if(modes[e.test].on) e[k]++;
    }
  }

  makeCSV(){
    // Thanks to this Stack Overflow page
    // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side

    // Create the file
    let csvContent = "data:text/csv;charset=utf-8,";

    // Set up columns
    csvContent += " , 1, 2, 3 \r\n";

    // Section header for node layouts
    csvContent += "Node Layouts \r\n";

    // Create row for each node layout option, and then fill out the columns with the scores
    for(let n of this.nodeLayouts){
      csvContent += n.name + "," +
                      n._1 + "," +
                      n._2 + "," +
                      n._3 + "\r\n";
    }
    csvContent += "\r\n";

    // Same for extras
    csvContent += "Extras \r\n";
    for(let n of this.extras){
      csvContent += n.name + "," +
                      n._1 + "," +
                      n._2 + "," +
                      n._3 + "\r\n";
    }
    csvContent += "\r\n";

    // All of this is just to put it together and download it
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ratings.csv");
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file"
  }
}
