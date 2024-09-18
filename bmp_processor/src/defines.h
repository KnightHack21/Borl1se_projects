#ifndef DEFINES_HEADER
#define DEFINES_HEADER

#define SHORT_OPTIONS "i:rL:R:o:ghIlzs:e:c:t:f:G:a:b:n"

#define OPTION_INPUT "input", required_argument, NULL, 'i'
#define OPTION_OUTPUT "output", required_argument, NULL, 'o'
#define OPTION_INVERSE "inverse", no_argument, NULL, 'r'
#define OPTION_GRAY "gray", no_argument, NULL, 'g'
#define OPTION_LINE "line", no_argument, NULL, 'l'
#define OPTION_RESIZE "resize", no_argument, NULL, 'z'
#define OPTION_LEFT "left", required_argument, NULL, 'f'
#define OPTION_RIGHT "right", required_argument, NULL, 'G'
#define OPTION_ABOVE "above", required_argument, NULL, 'a'
#define OPTION_BELOW "below", required_argument, NULL, 'b'
#define OPTION_START "start", required_argument, NULL, 's'
#define OPTION_END "end", required_argument, NULL, 'e'
#define OPTION_COLOR "color", required_argument, NULL, 'c'
#define OPTION_THICKNESS "thickness", required_argument, NULL, 't'
#define OPTION_LEFT_UP "left_up", required_argument, NULL, 'L'
#define OPTION_RIGHT_DOWN "right_down", required_argument, NULL, 'R'
#define OPTION_HELP "help", no_argument, NULL, 'h'
#define OPTION_INFO "info", no_argument, NULL, 'I'
#define OPTION_NULL NULL, no_argument, NULL, 0 
#define OPTION_RAMKA "outside_ornament", no_argument, NULL, 'n'

#define END_OPTIONS -1

#define UNKNOWN_OPTION '?'

#define SUCESSFULLY_INPUT_OUTPUT 3

#define COUNT_LINE_FLAGS 4

#define MESSAGE_SKIP_ARGS "Programm will skip non-existent args\n"

#define ERROR_INPUT_PARAMS "Error input parrams"
#define ERROR_MESSAGE_PARAMS "Input params!"
#define ERROR_ALLOCATE_MEMORY "Error to allocate memory"
#define ERROR_ACTION_IMAGE "You have not selected an image action"
#define ERROR_COLOR "Input color"
#define ERROR_THICKNESS "Bad thickness"
#define ERROR_SUCESSFULLY_INPUT_OUTPUT "Enter the name of the input file and output file"

#define EXIT_CODE 0

#endif
