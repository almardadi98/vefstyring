#include <wiringPi.h>
#include <softPwm.h>
#include <iostream>
#include <stdio.h>
#include <stdlib.h>

#define LedPinRed    0
#define LedPinGreen  1
#define LedPinBlue   2


int map(int x, int in_min, int in_max, int out_min, int out_max)
{
    return (x -in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}


class styring{
	public:
        
        int r,g,b;
		styring()
		{
			std::cout << "Initialize PWM..." << std::endl;
                // 0 er upphafsgildi, 100 er range
            softPwmCreate(LedPinRed,   0, 100);
            softPwmCreate(LedPinGreen, 0, 100);
            softPwmCreate(LedPinBlue,  0, 100);
		}
        void getInput()
        {
            std::cout << "R: ";
            std::cin >> this->r;
            std::cout << "G: ";
            std::cin >> this->g;
            std::cout << "B: ";
            std::cin >> this->b;
            styring::ledColorSet(r,g,b);
        }
        void ledColorSet(int r, int g, int b)
        {
            r = map(r, 0, 255, 0, 100);
            g = map(g, 0, 255, 0, 100);
            b = map(b, 0, 255, 0, 100);    
            //printf(" R = %d", r);
            //printf(" G = %d", g);
            //printf(" B = %d", b);

            softPwmWrite(LedPinRed,   100 - r);  //change duty cycle
            softPwmWrite(LedPinGreen, 100 - g);
            softPwmWrite(LedPinBlue,  100 - b);
        }
		~styring()
		{
			std::cout << "Destruct" << std::endl;
		}
};

int main()
{
    if(wiringPiSetup() < 0) { //when initialize wiringPi failed, print message to screen
        printf("setup wiringPi failed !\n");
        return -1;
    }

    styring str;
    while (true){
    str.getInput();
    }

    return 0;  
}  
