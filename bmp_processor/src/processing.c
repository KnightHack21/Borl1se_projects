#include "processing.h"

int processing(int argc, char ** argv){
	if (argc == 1){
		help_display();
		return 0;
	}

	char *opts = SHORT_OPTIONS;
	int longidx;
	   
	static struct option longopts[] = 
	{
	    {OPTION_INPUT},
	    {OPTION_OUTPUT},
	    {OPTION_INVERSE},
	    {OPTION_GRAY},
	    {OPTION_LINE},
	    {OPTION_RESIZE},
	    {OPTION_LEFT},
	    {OPTION_RIGHT},
	    {OPTION_ABOVE},
	    {OPTION_BELOW},
	    {OPTION_START},
	    {OPTION_END},
	    {OPTION_COLOR},
	    {OPTION_THICKNESS},
	    {OPTION_LEFT_UP},
	    {OPTION_RIGHT_DOWN},
	    {OPTION_HELP},
	    {OPTION_INFO},
	    {OPTION_RAMKA},
	    {OPTION_NULL}
	};
	   
	int option = getopt_long(argc, argv, opts, longopts, &longidx);

	char * file_name;
	char * output_file_name;

	rgb color;

	int x1 = -1;
	int y1 = -1;
	int x2 = -1;
	int y2 = -1;

	int x1_line = -1;
	int y1_line = -1;
	int x2_line = -1;
	int y2_line = -1; 

	int right_resize = 0;
	int left_resize = 0;
	int up_resize = 0;
	int down_resize = 0;


	int red_component_color;
	int green_component_color;
	int blue_component_color;

	int thickness = 0;

	int inverse_flag = 0;
	int gray_flag = 0;
	int info_flag = 0;
	int line_flag = 0;
	int resize_flag = 0;

	int input_output_flag = 0;
	int was_input_action_flag = 0;

	int color_flag = 0;
	int result_assignment = 0;
	int inverse_and_gray_flags = 0;
	int line_flags = 0;
	int resize_flags = 0;
	int ramka_flag = 0;

	while(option != END_OPTIONS){
		switch(option){
			case 'i':{
				file_name = optarg;
				input_output_flag++;	
				break;
			}
			case 'o':{
				output_file_name = optarg;
				input_output_flag++;	
				break;
			}
			case 'r':{
				if (!inverse_flag)
					inverse_flag = 1;
					was_input_action_flag++;
				break;
			}
			case 'z':{
				if (!resize_flag)
					resize_flag = 1;
					was_input_action_flag++;
				break;
			}
			case 'g':{
				if (!gray_flag)
					gray_flag = 1;
					was_input_action_flag++;
				break;
			}
			case 'n':{
				if (!ramka_flag)
					ramka_flag = 1;
					was_input_action_flag++;
				break;
			}
			case 'I':{
				if (!info_flag)
					info_flag = 1;
					was_input_action_flag++;
				break;
			}
			case 'l':{
				if (!line_flag)
					line_flag = 1;
					was_input_action_flag++;
				break;
			}
			case 'h':{
				help_display();
				return EXIT_CODE;
			}
			case 'L':{
				result_assignment = sscanf(optarg, "%d.%d", &x1, &y1);
				if (result_assignment != 2)
					failure(ERROR_INPUT_PARAMS);
				inverse_and_gray_flags++;
	               break;
			}
			case 'R':{
				result_assignment = sscanf(optarg, "%d.%d", &x2, &y2);
				if (result_assignment != 2)
					failure(ERROR_INPUT_PARAMS);
				inverse_and_gray_flags++;
	               break;
			}
			case 's':{
				result_assignment = sscanf(optarg, "%d.%d", &x1_line, &y1_line);
				if (result_assignment != 2)
					failure(ERROR_INPUT_PARAMS);
				line_flags++;
				break;
			}
			case 'e':{
				result_assignment = sscanf(optarg, "%d.%d", &x2_line, &y2_line);
				if (result_assignment != 2)
					failure(ERROR_INPUT_PARAMS);
				line_flags++;
				break;
			}
			case 'c':{
				result_assignment = sscanf(optarg, "%d.%d.%d", &red_component_color, &green_component_color, &blue_component_color);
				if (result_assignment != 3)
					failure(ERROR_INPUT_PARAMS);
				color_flag++;
				line_flags++;
				break;
			}
			case 't':{
				result_assignment = sscanf(optarg, "%d", &thickness);
				if (!result_assignment)
					failure(ERROR_INPUT_PARAMS);
				line_flags++;
				break;
			}
			case 'f':{
				result_assignment = sscanf(optarg, "%d", &left_resize);
				if (!result_assignment)
					failure(ERROR_INPUT_PARAMS);
				resize_flags++;
				break;
			}
			case 'G':{
				result_assignment = sscanf(optarg, "%d", &right_resize);
				if (!result_assignment)
					failure(ERROR_INPUT_PARAMS);
				resize_flags++;
				break;
			}
			case 'a':{
				result_assignment = sscanf(optarg, "%d", &up_resize);
				if (!result_assignment)
					failure(ERROR_INPUT_PARAMS);
				resize_flags++;
				break;
			}
			case 'b':{
				result_assignment = sscanf(optarg, "%d", &down_resize);
				if (!result_assignment)
					failure(ERROR_INPUT_PARAMS);
				resize_flags++;
				break;
			}
			case UNKNOWN_OPTION:{
				printf(MESSAGE_SKIP_ARGS);
			}
		}
		option = getopt_long(argc, argv, opts, longopts, &longidx);	
	}

	if (input_output_flag == 1)
		file_name = argv[argc-1];
		++input_output_flag;

	if (info_flag){
		if (input_output_flag == 0)
			file_name = argv[argc-1];
			
		image_bmp * image = (image_bmp*)malloc(sizeof(image_bmp));
		
		if (!image) failure(ERROR_ALLOCATE_MEMORY); 
		
		read_image_bmp(file_name, image);
		print_info_header(image->dheader);	
		return EXIT_CODE;
	}

	if (input_output_flag != SUCESSFULLY_INPUT_OUTPUT)
		failure(ERROR_SUCESSFULLY_INPUT_OUTPUT);
	
	image_bmp * image = (image_bmp*)malloc(sizeof(image_bmp));

	if (!image) failure(ERROR_ALLOCATE_MEMORY); 

	read_image_bmp(file_name, image);	

	if (inverse_flag && inverse_and_gray_flags == 2){
		check_coords(image, &x1, &x2, &y1, &y2);
		reverse_color(image, x1, y1, x2, y2);
	}else if (inverse_flag && inverse_and_gray_flags != 2){
		failure(ERROR_MESSAGE_PARAMS);
	} 
	
	if (gray_flag && inverse_and_gray_flags == 2){
		check_coords(image, &x1, &x2, &y1, &y2);
		gray_image(image, x1, y1, x2, y2);
	}else if (gray_flag && inverse_and_gray_flags != 2){
		failure(ERROR_MESSAGE_PARAMS);
	} 
	
	if (line_flag && line_flags == COUNT_LINE_FLAGS){
		check_coords(image, &x1_line, &x2_line, &y1_line, &y2_line);
		check_line_metainfo(&color, red_component_color, green_component_color, blue_component_color);

		if (thickness <= 0)
			failure(ERROR_THICKNESS);
			
		draw_line(image, x1_line, y1_line, x2_line, y2_line, color, thickness);
	}else if (line_flag && line_flags != 4){
		failure(ERROR_MESSAGE_PARAMS);
	}
	
	if (ramka_flag){
		if (!color_flag) failure(ERROR_COLOR);

		check_line_metainfo(&color, red_component_color, green_component_color, blue_component_color);

		if (thickness <= 0)
			failure(ERROR_THICKNESS);

		draw_ramka(image, thickness, color, output_file_name);
		return EXIT_CODE;
	}
	
	if (resize_flag && resize_flags){
		if (!color_flag) failure(ERROR_COLOR);
		check_line_metainfo(&color, red_component_color, green_component_color, blue_component_color);
		resize(image, left_resize, right_resize, up_resize, down_resize, output_file_name, color);
	}else if (resize_flag && resize_flags == 0){
		failure(ERROR_MESSAGE_PARAMS);
	}
	
	if (was_input_action_flag && !resize_flag)
		save_bmp(output_file_name, *image);
		
	if (!was_input_action_flag)
		failure(ERROR_ACTION_IMAGE);
		
	return EXIT_CODE;
}
