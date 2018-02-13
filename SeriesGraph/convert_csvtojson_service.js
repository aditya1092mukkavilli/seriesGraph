var graphService = angular.module('grapapp');

graphService.service('convertCsvToJson', [function(){

   /*Converting extratced data to JSon*/
   this.convert = function(fileData)
   { 
    let finalObj = [];
    let tempObj = {};
    let splitByLine = fileData.split(/[\n]/);        
            for(let i=0;i<splitByLine.length; i++)
            {
                let splitByComma = splitByLine[i].split(',');
                    for(let j=0; j<splitByComma.length; j++)
                    {
                        if(j==0)
                        {
                            tempObj[splitByComma[0]] = {};
                            tempObj[splitByComma[0]].data= [];
                        }
                        else
                        {
                            let pipesplit  = splitByComma[j].split('|');
                            tempObj[splitByComma[0]].data.push({x:parseInt(pipesplit[0]), y:parseInt(pipesplit[1])});
                        }
                    }
                        finalObj.push(tempObj);
                        tempObj ={};
            }  
            return finalObj;                      
    } 
        


}]);