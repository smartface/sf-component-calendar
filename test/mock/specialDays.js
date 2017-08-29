export default {
		"isSpecialDay": function(date){
			
		},
		"byYears":[{
	    "year": 2018,
		  "months": [
		    // month 1st
  	    {
  		    "month": 0,
  		    /** @type {SpecialDays} */
  		    "days": [
  		      // day 1st
    	      {
    	        "day": 0,
    	        "calendars": {
              	"gregorian": {
      	        	"availableLangs": "en,tr,~ar",
      	        	"text": {
      	        		"*": "Happy New Year",
						        "tr": "Mutlu Yeni Yillar"
      	        	}
      	        }
  	          }
            }
          ]//end of days
        }
      ]//end of months
    }],//end of byYears
    "byMonths": [
      // month 1st
      {
        "month": 0,
  	    /** @type {SpecialDays} */
        "days": [
          {
            "day": 0,
            "calendars": {
            	"gregorian": {
              	"availableLangs": "en,tr",
              	"text": {
              		"*": "in all langs",
              		"tr": "just in turkish"
              	}
              }
            },
            "length": 2
          },
          {
            "day": 6,
            "calendars": {
          	  "*": {
              	"availableLangs": "en,tr",
              	"text": {
              		"*": "in all langs",
              		"tr": "just in turkish"
              	}       	
            	}
            }
          }
        ]//end of days,
      },
      // month 4th
      {
        "month": 3,
        "days": [
          {
            "day": 11,
            "calendars": {
            	"*": {
              	"availableLangs": "en,ar",
              	"text": {
              		"*": "in all langs",
              		"ar": "just in arabic"
              	}
            	}
            }
          }
        ]
        //end of days
      },
      //end of month 4th
      
    ]//end of byMonths
  }
	