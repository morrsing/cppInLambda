# Binary Execution from Lambda
This project demonstrates calling a binary executable from inside of a Lambda 
function.  It also demonstrates the interface between the executable and the 
Lambda function through sending output to `STDOUT` and `STDERR`, as well as 
through the use of error codes.

For this project, the executable is quite basic: a parameterized Hello World 
program that accepts a name as an argument. If a name is provided, the result 
will be a greeting as follows:

```sh
$ ./bin/executable World; echo -e "\n$?"
Hello, World
0
```

As such, the specified name is included in a "Hello, World" greeting that it 
sends to `STDOUT`, and the program returns `0`.

On the other hand, if no argument is provided for a name, the program sends an  
error message to `STDERR` and returns `1`.
```sh
./bin/executable; echo -e "\n$?"
Invalid: No name specified.
1
```

A binary executable inside of a Lambda function used in a production system  
would almost certainly include far more complex logic than this simple Hello 
World program, but this is sufficient to cleanly demonstrate the fundamentals. 

## How it Works
A simple invocation script is defined inside of a Lambda function handler, 
written in one of the supported Lambda runtimes (in this case, JavaScript). 
The JavaScript inside of the handler invokes the executable, which is packaged 
with the handler.

The handler monitors for data on `STDOUT` and `STDERR`, taking appropriate 
action (for this example, logging to CloudWatch) and calling the callback 
passed to the handler when finished. The callback is called either with an 
error value or a result, depending on the result of running the executable.

## Getting Started

### Compiling Executable
You will need to compile the executable for Amazon Linux in order to run it 
inside of a Lambda function. Clone this project inside of an Amazon Linux box 
and compile it using Make:

```sh
make
```

Depending on the configuration of your Amazon Linux box, you may need the 
development tools, such as G++ and Make. See the AWS documentation on 
[Preparing to Compile Software](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/compile-software.html)
for more details on how to set up Amazon Linux for software compilation.

### Building for Lambda

## Testing Behavior

### Demo Executable
You can run the executable from a shell, such as Bash to test its behavior. 


### Test Harness
```sh
node test/driver.js 
stderr: Invalid: No name specified.
ERROR: Invalid: No name specified.
```

```sh
node test/driver.js --name World
stdout: Hello, World
DATA: Hello, World
```

