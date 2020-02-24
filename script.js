
$('document').ready(function(){
    var step_array = [ 'clock', 'day', 'week', 'month', 'whole', 'about' ]
    var counter = 0
    var $vid =   $("#theVideo");
    var current_settimeout
    var step_settimeout
    var clockon = false
    var clock_settimeout
    $('.exhibition_button').click(function(){
        $('.underline').removeClass('underline')
        $(this).addClass('underline')
        $('.popup_open').removeClass('popup_open')
    })
    steps('month')
    $('#clock_view_button').click(function(){
        steps('clock')
        var vid = $vid.get(0);
        vid.play(); 


        counter = 0
        $('#theVideo').css({transform:'translate(-50%,-50%) rotate(0deg)'})
        $('.clock_s').css({transform:'translateY(-100%) rotate(39deg)'})
        $('.clock_v').css({transform:'translateY(-100%) rotate(180deg)'})

        clockon = true
        setTimeout(function(){timestart()},1000)
        setTimeout(function(){$('.clock_s').show()},1300)
        setTimeout(function(){$('.clock_v').show()},1300)
    })
    $('#day_view_button').click(function(){
        clockon = false
        steps('day')
    })
    $('#week_view_button').click(function(){
        clockon = false
        steps('week')
    })
    $('#month_view_button').click(function(){
        clockon = false
        steps('month')
    })
    $('#whole_view_button').click(function(){
        clockon = false
        steps('whole')
    })
    $('#about_view_button').click(function(){
        clockon = false
        steps('about')
        $('about')
    })
    add_show()
    function add_show(showtime,hidetime,next_step){
        clearTimeout('clock_settimeout')
        clearTimeout('current_settimeout')
        $('.clock_s').hide()
        $('.clock_v').hide()


        var unit = $('.view_button').outerHeight()
        $('.selected').removeClass('selected')
        $('.view_button_'+(get_current_step()+1)).addClass('selected')
        $('#nav_circle').css({'top':unit*(get_current_step()+1)})
        console.log(unit*get_current_step()+1)




        current_settimeout = setTimeout(function(){ 
            $('.'+ step_array[next_step] + '_view').addClass('show')
        },showtime);
        // 200
        current_settimeout = setTimeout(function(){ 
            $('.show:not(.'+step_array[next_step]+'_view)').removeClass('show')
        },hidetime);
        // 300
    }
    function get_current_step(){
        for (var i = step_array.length - 1; i >= 0; i--) {
            if(step_array[i] === $('body').attr('class').split('_body')[0]){
                return i
            }
        }
    }
    function get_selected_step(selected){
        console.log(selected)
        for (var i = step_array.length - 1; i >= 0; i--) {
            if(step_array[i] === selected){
                return i
            }
        }
    }
    function steps(selected){
        console.log(selected)
        var current = get_current_step()
        var selected_n = get_selected_step(selected)
        var next_step
        console.log(get_current_step() == 0)
        console.log(selected === 'about')
        if(get_current_step() == 0 && selected === 'about'){
            $('body').removeClass()
            $('body').addClass('about_body')
            add_show(200,300,5)
            return false
        }
        if(current > selected_n){
            $('body').removeClass()
            next_step = step_array[current - 1]
            $('body').addClass(step_array[current - 1]+'_body')
            add_show(200,300,current - 1)
        }else if (current < selected_n){
            $('body').removeClass()
            next_step = step_array[current + 1]
            $('body').addClass(step_array[current + 1]+'_body')
            add_show(200,300,current + 1)
        }
        console.log(next_step)
        if(Math.abs(current - selected_n)>1){
            console.log('hey')
            step_settimeout =  setTimeout(function(){ 
                steps(selected)
            },500);
        }
    }
    function timestart(){
        counter ++ 
        $('#theVideo').css({transform:'translate(-50%,-50%) rotate('+counter*2+'deg)'})
        $('.clock_s').css({transform:'translateY(-100%) rotate('+(39+counter*2)+'deg)'})
        $('.clock_v').css({transform:'translateY(-100%) rotate('+(180+counter*2)+'deg)'})
        if(clockon){
            clock_settimeout =  setTimeout(function(){timestart()},1000);
        }
    }
})