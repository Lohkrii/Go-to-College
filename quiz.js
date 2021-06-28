// A personality quiz
// This is an array of objects that stores the personality trait that is prompted to the user and the weight for each prompt.
// If a personality trait is considered more introverted, it will have a negative weight.
// If a personlity trait is considered more extroverted, it will have a positive weight.
var prompts = [
    // Preferences
    {
        prompt: 'Are you open to work internationally?',
        weight: 0,
        class: 'group0'
    },
    {
        prompt: 'Can you picture yourself working late nights and weekend shifts?',
        weight: 0,
        class: 'group1'
    },
    {
        prompt: 'Do you prefer to work in a group?',
        weight: 0,
        class: 'group2'
    },
    {
        prompt: 'Do you like planning, organizing and creating structure?',
        weight: 0,
        class: 'group3'
    },
    {
        prompt: 'Do you like history, religion or questions related to society and politics?',
        weight: 0,
        class: 'group4'
    },
    // Art
    {
        prompt: 'Are you creative, artistic and/or musical?',
        weight: 1,
        class: 'group5'
    },
    {
        prompt: 'Do you enjoy reading, going to the theatre and movies?',
        weight: 1,
        class: 'group6'
    },
    {
        prompt: 'Do you like to write, paint, or design?',
        weight: 3,
        class: 'group7'
    },
    {
        prompt: 'Are trends, beauty and fashion important to you?',
        weight: 2,
        class: 'group8'
    },
    {
        prompt: 'Do you enjoy languages?',
        weight: 2,
        class: 'group9'
    },
    // Business
    {
        prompt: 'Do you like commercials/advertising?',
        weight: 2,
        class: 'group10'
    },
    {
        prompt: 'Do you think it is important to follow laws and rules?',
        weight: 1,
        class: 'group11'
    },
    {
        prompt: 'Are you passionate about information and communication?',
        weight: 2,
        class: 'group12'
    },
    {
        prompt: 'Do you like hosting parties and fancy dinners?',
        weight: 1,
        class: 'group13'
    },
    {
        prompt: 'Are you service minded with a high stress threshold and want to work with people?',
        weight: 3,
        class: 'group14'
    },
    // Engineering
    {
        prompt: 'Do you enjoy building things and working with your hands?',
        weight: 2,
        class: 'group15'
    },
    {
        prompt: 'Do you find some STEM fields interesting to study?',
        weight: 3,
        class: 'group16'
    },
    {
        prompt: 'Do you like to understand how things work, and be involved in creating things?',
        weight: 1,
        class: 'group17'
    },
    {
        prompt: 'Are you a "handy-man" and enjoy fixing technical things at home?',
        weight: 1,
        class: 'group18'
    },
    {
        prompt: 'Are you interested in electronics and up-to-date with the latest technological developments?',
        weight: 2,
        class: 'group19'
    }
    ]
    // This array stores all of the possible values and the weight associated with the value.
    // The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
    var prompt_values = [
    {
        value: 'No',
        class: 'btn-default btn-agree',
        weight: 0,
    },
    {
        value: 'Indifferent',
        class: 'btn-default',
        weight: 1
    },
    {
        value: 'Yes',
        class: 'btn-default btn-disagree',
        weight: 2
    }
    ]
    // For each prompt, create a list item to be inserted in the list group
    function createPromptItems() {
        for (var i = 0; i < prompts.length; i++) {
            var prompt_li = document.createElement('li');
            var prompt_p = document.createElement('p');
            var prompt_text = document.createTextNode(prompts[i].prompt);
            prompt_li.setAttribute('class', 'list-group-item prompt');
            prompt_p.appendChild(prompt_text);
            prompt_li.appendChild(prompt_p);
            document.getElementById('quiz').appendChild(prompt_li);
        }
    }
    // For each possible value, create a button for each to be inserted into each li of the quiz
    // function createValueButtons() {
// for (var li_index = 0; li_index < prompts.length; li_index++) {
// for (var i = 0; i < prompt_values.length; i++) {
// var val_button = document.createElement('button');
// var val_text = document.createTextNode(prompt_values[i].value);
// val_button.setAttribute('class', 'value-btn btn ' + prompt_values[i].class);
// val_button.appendChild(val_text);
// document.getElementsByClassName('prompt')[li_index].appendChild(val_button);
// }
// }
    // }
    function createValueButtons() {
        for (var li_index = 0; li_index < prompts.length; li_index++) {
            var group = document.createElement('div')
            group.classNe = 'btn-group btn-group-justified';
            for (var i = 0; i < prompt_values.length; i++) {
                var btn_group = document.createElement('div');
                btn_group.className = 'btn-group';
                var button = document.createElement('button');
                var button_text = document.createTextNode(prompt_values[i].value);
                button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
                button.appendChild(button_text);
                btn_group.appendChild(button);
                group.appendChild(btn_group);
                document.getElementsByClassName('prompt')[li_index].appendChild(group);
        }
        }
    }
    createPromptItems();
    createValueButtons();
    // Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
    // Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
    var total = "";
    // Get the weight associated to group number
    function findPromptWeight(prompts, group) {
        var weight = 0;
        for (var i = 0; i < prompts.length; i++) {
            if (prompts[i].class === group) {
                weight = prompts[i].weight;
            }
        }
        return weight;
    }
    
    // Get the weight associated to the value
    function findValueWeight(values, value) {
        var weight = 0;
        for (var i = 0; i < values.length; i++) {
            if (values[i].value === value) {
                weight = values[i].weight;
            }
        }
        return weight;
    }
    
    function arrSort(dict) {
      var length = 0;
      var arr = [];
      for (var k in dict) {
        length++;
      }
      for (var idx = 0; idx < length; idx++) {
        arr.push(dict["group" + idx.toString()])
      }
      return arr;
    }
    
    //Calculating results function
    // function calcResults(prompts) {
    //   var idx = 0;
    //   const arr = [];
    //   for (idx = 0; idx < prompts.length; idx++) {
    //     arr.push(prompts[idx])
    //   }
    //   console.log(arr.length)
    //   return arr;
    // }
    
    function test_answer(results) {
      var idx = 0;
      var eng = 0;
      var art = 0;
      var bus = 0;
      if (results.length < 19) {
        return "error";
      }
      for (idx = 5; idx < results.length; idx++) {
        if (idx > 14) {
          eng += results[idx];
        } else if (idx > 9) {
          bus += results[idx];
        } else {
          art += results[idx];
        }
      }
      if (eng > art && eng > bus) {
        return "eng";
      } else if (art > eng && art > bus) {
        return "art";
      } else if (bus > eng && bus > art) {
        return "bus";
      } else if (art === bus && art > eng) {
        return "execution";
      } else if (art === eng && art > bus) {
        return "arquitect";
      } else if (bus === eng && bus > art) {
        return "analytics";
      } else {
      return "tie";
      }
    }
    
    var answersDict = {};
    // When user clicks a value to agree/disagree with the prompt, display to the user what they selected
    $('.value-btn').mousedown(function () {
        var classList = $(this).attr('class');
        var classArr = classList.split(" ");
        console.log(classArr);
        var this_group = classArr[0];
        // If button is already selected, de-select it when clicked and subtract any previously added values to the total
        // Otherwise, de-select any selected buttons in group and select the one just clicked
        // And subtract deselected weighted value and add the newly selected weighted value to the total
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        answersDict[this_group] = (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        } else {
            answersDict[this_group] = (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
            $('.'+this_group).removeClass('active');
            $(this).addClass('active');
            answersDict[this_group] = (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
        }
      result = arrSort(answersDict);
      total = test_answer(result);
        console.log(total);
      console.log(result.length);
    })
    
    $('#submit-btn').click(function () {
        // After clicking submit, add up the totals from answers
        // For each group, find the value that is active
        $('.results').removeClass('hide');
        $('.results').addClass('show');
        console.log(answersDict);
        if(total === "art") {
            // document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
            // console.log(document.getElementById('intro-bar').style.width);
            // document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
            document.getElementById('results').innerHTML = '<b>Art!</b><br><br>\
            You scored highest in Art! Don’t be discouraged if this is not what you had in mind.\
    <br><br>\
    This test is only a recommendation, if you have a set preference not specified here, don’t be afraid to pursue it!\
    <br><br>\
    Generally art students have an aptitude or liking towards writing, painting, design, media, and performing arts. There are hundreds of bachelors within the art sub-category and many more proffesions. But don’t rush! As you learn about new things inside your degree you will get a clearer picture of where you want to specialize.\
            ';
        } else if(total === "bus") {
            document.getElementById('results').innerHTML = '<b>Business!</b><br><br>\
            It looks like your highest aptitude and preference is business! Don’t be discouraged if this is not what you had in mind\
    <br><br>\
    This test is only a recommendation, if you have a set preference not specified here, don’t be afraid to pursue it!\
    <br><br>\
    Generally business students have an aptitude or liking towards marketing, product branding, business management and more. There are many different bahcelors within the business sector and many more proffesions. But have no worry! Once you start and discover the branches you could take your road will become much clearer.';
        } else if(total === "eng") {
            document.getElementById('results').innerHTML = '<b>Engineering!</b><br><br>\
            It looks like your highest aptitude and preference is engineering! Don’t be discouraged if this is not what you had in mind\n\
    <br><br>\
    This test is only a recommendation, if you have a set preference not specified here don’t be afraid to pursue it!\n\
    <br><br>\
    Generally engineering students have an aptitude or liking towards STEM fields, on site jobs, and product building affinity. There are hundreds of Engineering bachelors\
    and thousands of professions inside of this field. But don’t get overwhelmed! Start by going into what you like the most and dive deeper from there. It’s about the journey not\
    about the destination.'
        } else if (total === "analytics") {
            document.getElementById('results').innerHTML = '<b>Tied!</b><br><br>\
            You scored a tie in Business and Engineering! Don’t be discouraged if this is not what you had in mind.\
        <br><br>\
        This test is only a recommendation, if you have a set preference not specified here, don’t be afraid to pursue it!\
        <br><br>\
        Generally this tie means you stand out in Anlytics and have a knack for the implementation of systems, it also means you have more possibilities than most students, if you have  a field that calls to you you should definitely pursue that path, the best way to find the things we like is to try them!'
      } else if (total === "architect") {
            document.getElementById('results').innerHTML = '<b>Tied!</b><br><br>\
            You scored a tie between Engineering and Art! Don’t be discouraged if this is not what you had in mind.\
        <br><br>\
        This test is only a recommendation, if you have a set preference not specified here, don’t be afraid to pursue it!\
        <br><br>\
        Generally this tie means you have an aptitude for design and implementation, these two fields synergize very well, there are thousands of preffesions in this in between, it also means you have more possibilities than most students, if you have a field that calls to you you should definitely pursue that path, the best way to find the things we like is to try them!'
      } else if (total === "execution") {
            document.getElementById('results').innerHTML = '<b>Tied!</b><br><br>\
            You scored a tie between art and business! Don’t be discouraged if this is not what you had in mind.\
        <br><br>\
        This test is only a recommendation, if you have a set preference not specified here, don’t be afraid to pursue it!\
        <br><br>\
        Generally this tie means you have an aptitude for the art sector and business sector, there are thousands of proffesions within this category. It also means you have more options than most students, if you have a field that calls to you you should definitely pursue that path, the best way to find the things we like is to try them!'
      } else if (total === "tie") {
            document.getElementById('results').innerHTML = '<b>Tied!</b><br><br>\
            You scored a tie in All! Don’t be discouraged if this is not what you had in mind.\
        <br><br>\
        This test is only a recommendation, if you have a set preference not specified here, don’t be afraid to pursue it!\
        <br><br>\
        Generally this tie means you have more possibilities than most students, if you have a field that calls to you you should definitely pursue that path, the best way to find the things we like is to try them!'
      } else {
        document.getElementById('results').innerHTML = '<b>Error!</b><br><br>\
            Did you answer the test completely? Please go back and verify that all of your answers are correctly marked.\
        <br><br>\
        This test is only a recommendation, if you have a set preference not specified here, don’t be afraid to pursue it!'
      }
        // Hide the quiz after they submit their results
        $('#quiz').addClass('hide');
        $('#submit-btn').addClass('hide');
        $('#retake-btn').removeClass('hide');
    })
    // Refresh the screen to show a new quiz if they click the retake quiz button
    $('#retake-btn').click(function () {
        $('#quiz').removeClass('hide');
        $('#submit-btn').removeClass('hide');
        $('#retake-btn').addClass('hide');
        $('.results').addClass('hide');
        $('.results').removeClass('show');
        location.reload();

    });

    function reload() {
        reload = location.reload();
    }
