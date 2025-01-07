import java.util.Scanner;

public class FizzBuzz {

    static void optimizedFizzBuzz(int n){
        for (int i = 0; i <= n; i++) {
            if(i % 3 == 0){
                if(i % 5 == 0){
                    System.out.println("FizzBuzz");
                }else{
                    System.out.println("Fizz");
                }
            } else if(i % 5 == 0){
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
    static void naiveFizzBuzz(int n){
        for (int i = 1; i <= n; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                System.out.print("FizzBuzz ");
            } else if (i % 3 == 0) {
                System.out.print("Fizz ");
            } else if (i % 5 == 0) {
                System.out.print("Buzz ");
            } else {
                System.out.print(i + " ");
            }
        }
    }
     public static void main(String[] args) {
        try(Scanner scanner = new Scanner(System.in)){
            System.out.println("Enter the number: ");
            int n = scanner.nextInt();
            optimizedFizzBuzz(n);
        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
        }
     }
 }
 