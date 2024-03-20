# CMD

```c#
namespace CHello;
class Program
{
    static string CMDReader(string instruction)
    {
        Console.Write(instruction);
        string cmd = Console.ReadLine();
        return cmd;
    }
    static void Main(string[] args)
    {
        Console.WriteLine("-------客户管理系统--------");
        Console.WriteLine("请登录");
        bool isExit = false;
        do
        {
            string username;
            string password;
            username = CMDReader("用户名：");
            if (username != "alex")
            {
                Console.WriteLine("查无此人");
                continue;
            }
            password = CMDReader("密码：");
            if (password != "1234")
            {
                Console.WriteLine("密码错误，退出系统");
                continue;
            }
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
        } while (!isExit);
    }
}
```
