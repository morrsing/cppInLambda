#include <iostream> 

#define SUCCESS 0;
#define INVALID_INPUT_ERROR 1;

using namespace std;

int main(int argc, char *argv[]) {
  // If no name is specified, log error to stderr and return > 0.
  if (argc < 2) {
    cerr << "Invalid: No name specified.";
    return INVALID_INPUT_ERROR;
  }

  // Send greeting to stdout and return 0.
  cout << "Hello, " << argv[1];
  return SUCCESS;
}
