<?php
/**
 Plugin Name: WP Timeline - Timeline.verite.co Plugin
 Plugin URI:
 Description: From this plugin you can display a timeline page of your all WP posts.
 Author: Avinash Deedwaniya
 Version: 1.0
 Author URI: http://www.iwebdeeds.com
 */
$wpt_menu_manager_title='WP History Plugin';

/* Runs when plugin is activated */
register_activation_hook(__FILE__,'wp_ht_install'); 

/* Runs on plugin deactivation*/
register_deactivation_hook( __FILE__, 'wp_ht_remove' );

/* Update some variables*/
function coach_install() {
	 
	/* Creates new variables */
	add_option( 'wp_ht_enable_status', 'yes', '', 'yes' );
 	add_option( 'wp_ht_version', '1.0', '', '1.0' );
	
}
/* Remove all created variables*/
function coach_remove() {
	/* Deletes the database field */
	delete_option('wp_ht_enable_status');
	delete_option('wp_ht_version');
}

 


add_action( 'init', 'create_wp_history' );
function create_wp_history() {
    register_post_type( 'history_timeline',
        array(
            'labels' => array(
                'name' => 'History Timeline',
                'singular_name' => 'History Timeline',
                'add_new' => 'Add New',
                'add_new_item' => 'Add New Entry',
                'edit' => 'Edit',
                'edit_item' => 'Edit Entry',
                'new_item' => 'New Entry',
                'view' => 'View',
                'view_item' => 'View Entry',
                'search_items' => 'Search Entry',
                'not_found' => 'No Entry found',
                'not_found_in_trash' => 'No Entry found in Trash',
                'parent' => 'Parent Entry'
            ),
 
            'public' => true,
            'menu_position' => 15,
            'supports' => array( 'title', 'editor' ),
            'taxonomies' => array( '' ),
             
            'has_archive' => true
        )
    );
		 //wp_deregister_script('jquery');
 
         //wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js', false, '1.8.1');
 
        wp_enqueue_script('jquery');
 
	 wp_register_style( 'wp_ht_style', plugins_url('/timeline.css', __FILE__) );
	 
	 wp_enqueue_style( 'wp_ht_style' );
	wp_register_script(
		'wht_custom_script',
		plugins_url( 'verite.co.core.js?v210' , __FILE__ )
	);
	
	wp_register_script(
		'wht_custom_script2',
		plugins_url( 'timeline-min.js' , __FILE__ )
	);
	
	//wp_register_script(
	//	'wht_custom_script3',
	//	plugins_url( 'timeline-embed.js' , __FILE__ )
	//);
	wp_enqueue_script('wht_custom_script');
	wp_enqueue_script('wht_custom_script2');
	//wp_enqueue_script('wht_custom_script3');
}
	
add_action( 'admin_init', 'custom_fields_wp_history' );
function custom_fields_wp_history() {
    add_meta_box( 'history_timeline_meta_box',
        'Time Line Content',
        'display_history_timeline_meta_box',
        'history_timeline', 'normal', 'high'
    );
}

function display_history_timeline_meta_box( $post ) {
    // Retrieve current name of the Director and Movie Rating based on review ID
    $wp_ht_meta_content = ( get_post_meta( $post->ID, 'wp_ht_meta_content', true ) );
	$wp_ht_credit = ( get_post_meta( $post->ID, 'wp_ht_credit', true ) );
	$wp_ht_caption = ( get_post_meta( $post->ID, 'wp_ht_caption', true ) );
    $wp_ht_date = ( get_post_meta( $post->ID, 'wp_ht_date', true ) );
    ?>
    <table>
        <tr>
            <td style="width: 100%">Meta Content</td>
            <td><?php wp_editor( $wp_ht_meta_content, 'wp_ht_meta_content' );?> </td>
        </tr>
        
        <tr>
            <td style="width: 150px">Credit</td>
            <td><input type="text" name="wp_ht_credit" id="wp_ht_credit" value="<?php echo $wp_ht_credit?>" />
            </td>
        </tr>
        <tr>
            <td style="width: 150px">Caption</td>
            <td><input type="text" name="wp_ht_caption" id="wp_ht_caption" value="<?php echo $wp_ht_caption?>" />
            </td>
        </tr>
    </table>
    
    <?php
}

add_action( 'save_post', 'add_history_timeline_fields', 10, 2 );

function add_history_timeline_fields( $post_id  ) {
// Bail if we're doing an auto save
	if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	// if our current user can't edit this post, bail
	if( !current_user_can( 'edit_post' ) ) return;
    // Check post type for movie reviews
    if(get_post_type( $post_id )=='history_timeline'){
        // Store data in post meta table if present in post data
        if ( isset( $_POST['wp_ht_meta_content'] ) && $_POST['wp_ht_meta_content'] != '' ) {
            update_post_meta( $post_id, 'wp_ht_meta_content', $_POST['wp_ht_meta_content'] );
        }
        if ( isset( $_POST['wp_ht_credit'] ) && $_POST['wp_ht_credit'] != '' ) {
            update_post_meta( $post_id, 'wp_ht_credit', $_POST['wp_ht_credit'] );
        }
		if ( isset( $_POST['wp_ht_caption'] ) && $_POST['wp_ht_caption'] != '' ) {
            update_post_meta( $post_id, 'wp_ht_caption', $_POST['wp_ht_caption'] );
        }
        
   	$post_types=array('history_timeline');
	$timeline_pages = get_option( "wp_timeline_pages" );
$timeline_posts = get_option( "wp_timeline_posts" );

	if($timeline_pages==1){
		array_push($post_types,'page');
	}
	if($timeline_posts==1){
		array_push($post_types,'post');
	}
	$args=array('posts_per_page' => '-1', 'post_type' => $post_types, 'orderby' => 'publish_date', 'order' => 'asc');
 
        $my_query = new WP_Query($args);
         
        if( $my_query->have_posts() ) {
            
        $file_string = '{
            "timeline":';
        $i = 0;
        
       while ($my_query->have_posts()) : 
                $my_query->the_post();
            
            $i++;
             
             
              $date_time = get_post_time('Y,m,d',get_the_ID());

            if ($i == 1) {
                $file_string.='{
                            "headline":"' . htmlspecialchars(get_the_title(), ENT_QUOTES) . '",
                                "type":"default",
                                "startDate":"' . $date_time . '",
                                "text":"' . str_replace('"',"'",get_the_content() ) . '",
                                "asset":{
                                            "media":"' . str_replace('"',"'",get_post_meta(get_the_ID(), 'wp_ht_meta_content', true)) . '",
                                            "credit":"' . htmlspecialchars(get_post_meta(get_the_ID(), 'wp_ht_credit', true), ENT_QUOTES) . '",
                                            "caption":"' . htmlspecialchars(get_post_meta(get_the_ID(), 'wp_ht_caption', true), ENT_QUOTES) . '"
                                },
                                "date":[
                                ';
            } else {
                $file_string_arr[] = '{
                                        "startDate":"' . $date_time . '",
                                        "headline":"' . htmlspecialchars(get_the_title(), ENT_QUOTES) . '",
                                        "text":"' . str_replace('"',"'",get_the_content() ) . '",
                                        "asset":{
                                            "media":"' . str_replace('"',"'",get_post_meta(get_the_ID(), 'wp_ht_meta_content', true)). '",
                                            "credit":"' . htmlspecialchars(get_post_meta(get_the_ID(), 'wp_ht_credit', true), ENT_QUOTES) . '",
                                            "caption":"' . htmlspecialchars(get_post_meta(get_the_ID(), 'wp_ht_caption', true), ENT_QUOTES) . '"
                                        }
                                    }';
            }
        endwhile;
        


        $file_string.=implode(',', $file_string_arr);
        $file_string.=']
            }
        }';
          } //if ($my_query)
        wp_reset_query();  
        
 
        $filename = get_template_directory() . '/wp_ht_json.json';

        if (!$handle = fopen($filename, 'w+')) {
            echo "Cannot open file ($filename)";
            exit;
        }

        fwrite($handle, $file_string);



        fclose($handle);

    }
}

function get_history_timeline(){

  	
	
/*<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script> 
  <link rel="stylesheet"   href="'.plugins_url( 'timeline.css?ver=3.3.2' , __FILE__ ).'	" type="text/css" media="all" />
 <script type="text/javascript" src="'.plugins_url( 'verite.co.core.js?v210' , __FILE__ ).'"></script> 
  <script type="text/javascript" src="'.plugins_url( 'timeline-min.js' , __FILE__ ).'"></script>
    <script type="text/javascript" src="'.plugins_url( 'timeline-embed.js' , __FILE__ ).'"></script> */	
  $timeline_history='
<style> #timeline-embed{
				margin:0px !important;
				border:0px solid #CCC !important;
				padding:0px !important;
				-webkit-border-radius:0px !important;
				-moz-border-radius:0px !important;
				border-radius:0px !important;
				-moz-box-shadow:0 0px 0px rgba(0, 0, 0, 0.25) !important;
				-webkit-box-shadow:0 0px 0px rgba(0, 0, 0, 0.25) !important;
				box-shadow:0px 0px 0px rgba(0, 0, 0, 0.25) !important;
			}
			
		</style>   
  
  <div id="timeline-embed"></div>
  <script type="text/javascript">
    var timeline_config = {
     width: "100%",
     height: "100%",
     source: \''.get_template_directory_uri().'/wp_ht_json.json\'
    }
  </script><script type="text/javascript" src="'.plugins_url( 'timeline-embed.js' , __FILE__ ).'"></script>
';
  return $timeline_history;
}
add_shortcode('history_timeline', 'get_history_timeline');

add_action('admin_menu', 'add_settings_menu');
function add_settings_menu(){
     add_options_page('WP Timeline Options', 'WP Timeline', 'manage_options', 'wp_timeline_setting', 'wp_timeline_setting');
}

function wp_timeline_setting(){
	if(isset($_POST['submit']) && $_POST['submit']=='Save Changes'){
	 
		$updated = update_option( "wp_timeline_pages", $_POST['wp_timeline_pages'] );
		$updated = update_option( "wp_timeline_posts", $_POST['wp_timeline_posts'] );
	}
$timeline_pages = get_option( "wp_timeline_pages" );
$timeline_posts = get_option( "wp_timeline_posts" );
?>
<div class="wrap">
<div id="icon-options-general" class="icon32"><br></div><h2>WP Timeline Settings</h2>

<form method="post" action="">
 
<table class="form-table">
<tbody><tr valign="top">
<th scope="row"><label for="blogname">Include Post Types in timeline:</label></th>
<td><input type="checkbox" value="1" name="wp_timeline_pages" <?php checked( $timeline_pages, '1' ); ?> />&nbsp;Pages<br /><input type="checkbox" value="1" name="wp_timeline_posts" <?php checked( $timeline_posts, '1' ); ?> />&nbsp;Posts</td>
</tr>
 </tbody></table>
 
<p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes"></p></form>

</div>
<?php
}
 