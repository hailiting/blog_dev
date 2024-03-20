# CMD

```c#
using HelloWorld;

namespace CHello;
class Program
{

    static void Main(string[] args)
    {
        // 初始化用户系统
        User user = new User();
        Menu menu = new Menu();
        CMSController controller = new CMSController();
        Console.WriteLine("-------客户管理系统--------");
        Console.WriteLine("请登录");
        controller.Start(user, menu);
    }
    // 系统的控制核心
    public class CMSController
    {
        // 启动控制方法
        public void Start(User user, Menu menu)
        {
            do
            {
                // 什么时候登录 什么时候加载菜单
                user.Login();
            } while (!user.isUserLogin);
            // 显示菜单
            menu.ShowMenu();
        }
    }
    public class User
    {
        public bool isUserLogin;

        public void Login()
        {
            string username;
            string password;
            username = CMDReader("用户名：");
            if (username != "alex")
            {
                Console.WriteLine("查无此人");
                return;
            }
            password = CMDReader("密码：");
            if (password != "1234")
            {
                Console.WriteLine("密码错误，退出系统");
                return;
            }
            isUserLogin = true;
        }
    }
    public class Menu
    {
        public void ShowMenu()
        {
            bool isExit = false;
            while (!isExit)
            {
                string sele = CMDReader("主菜单\n 1.客户管理\n 2.预约管理\n 3.系统设置\n 4.退出系统 \n请选择：");
                switch (sele)
                {
                    case "1":
                        Console.WriteLine("客户管理");
                        break;
                    case "2":
                        Console.WriteLine("预约管理");
                        break;
                    case "3":
                        Console.WriteLine("系统设置");
                        break;
                    default:
                        Console.WriteLine("退出");
                        isExit = true;
                        break;
                }
            }
        }
    }
    static string CMDReader(string instruction)
    {
        Console.Write(instruction);
        string cmd = Console.ReadLine();
        return cmd;
    }
}
```
