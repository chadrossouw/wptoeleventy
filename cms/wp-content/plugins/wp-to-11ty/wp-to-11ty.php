<?php
/*
Plugin Name: WP to 11ty
Description:  Exports a JSON file on post save, executes some npm commands to run Eleventy
Version: 1.0
*/
// Basic security, prevents file from being loaded directly.

defined( 'ABSPATH' ) or die( 'Cheatin&#8217; uh?' );



add_action('wp_insert_post','export_json',10,3);
add_action( 'transition_post_status', 'delete_json', 10, 3 );

function export_json($post_id,$post,$update){
    
    if($post->post_status=='publish'){
        $root = dirname(__FILE__,5);
        if($post_id==get_option('page_on_front')){
            $data = [
                'title' => $post->post_title,
                'content' => apply_filters('the_content',$post->post_content),
            ];
            $data_json = json_encode($data);
            $file_home_path = '\build\src\_data\\';
            $file_home_name = 'home';
            $file = file_put_contents($root.$file_home_path.$file_home_name.'.json',$data_json,LOCK_EX);

            $file_name = 'static_page_'.wp_date('YmdHis',strtotime($post->post_date)).'__'.$post->post_name;
            $file_path = '\build\src\json\\'.$data['type'].'\\';
            if($file &&file_exists($root.$file_path.$file_name.'.json')){
                $delete = unlink($root.$file_path.$file_name.'.json');
                if($delete){
                    run_npm_concat_build($root.$file_path.'*.json',$root.'\build\src\_data\\static_page.json');
                }
            } 
            elseif($file){
                run_npm_build();
            }   
        }
        else{
            $post_type = $post->post_type=='page'?'static_page':$post->post_type;
            $data = [
                'title' => $post->post_title,
                'content' => apply_filters('the_content',$post->post_content),
                'date' => $post->post_date,
                'slug' => $post->post_name,
                'type' => $post_type,
                'showInNav'=>get_post_meta($post_id,'show_in_nav',true),
            ];
            $data_json = json_encode($data);  
            $file_name = $data['type'].'_'.wp_date('YmdHis',strtotime($data['date'])).'__'.$data['slug'];
            $file_path = '\build\src\json\\'.$data['type'].'\\';
            $parts = explode('\\', $file_path);
            $dir = $root;
            foreach($parts as $part){
                if(!is_dir($dir .= "\\".$part)){mkdir($dir);};
            }
            
            $file = file_put_contents($root.$file_path.$file_name.'.json',$data_json,LOCK_EX);
            if($file){
                run_npm_concat_build($root.$file_path.'*.json',$root.'\build\src\_data\\'.$data['type'].'.json');
            }
        }
    }

}

function delete_json( $new_status, $old_status, $post ) {
    if ( $old_status == 'publish'  &&  $new_status != 'publish' ) {
        $post_type = $post->post_type=='page'?'static_page':$post->post_type;
        $file_name = $post_type.'__'.$post->post_name;
        $root = dirname(__FILE__,5);
        $file_path = '\build\src\json\\'.$post_type.'\\';
        if(file_exists($root.$file_path.$file_name.'.json')){
            $delete = unlink($root.$file_path.$file_name.'.json');
            if($delete){
                run_npm_concat_build($root.$file_path.'*.json',$root.'\build\src\_data\\'.$post_type.'.json');
            }
        }    
    }
}

function run_npm_concat_build($src,$dest){
    $root = dirname(__FILE__,5);
    $cmd =  'npm run concat '.$src.' '.$dest;
    $cmd2 = 'npm run build_all';
    if (substr(php_uname(), 0, 7) == "Windows"){
        chdir($root.'\build');
        pclose(popen("start /B " .$cmd." && start /B ".$cmd2, "r"));
    }
    else {
        exec('cd '.$root.'\build\ && '.$cmd . " && ".$cmd2." > /dev/null &"); 
    } 
}

function run_npm_build(){
    $root = dirname(__FILE__,5);
    $cmd = 'npm run build_all';
    if (substr(php_uname(), 0, 7) == "Windows"){
        chdir($root.'\build');
        pclose(popen("start /B " .$cmd, "r"));
    }
    else {
        exec('cd '.$root.'\build\ && '.$cmd . " > /dev/null &"); 
    } 
}