import javax.swing.*;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

/**
 * 带进度条的限速的java文件下载
 *
 * @author Relish
 *         Created by Relish on 2016/7/14.
 */
public class ProgressBarDownloade extends JFrame implements Runnable {
    //限速标志(单位:Kb/s)
    private static final double limitSpeed = 100;
    //下载文件地址
    private static final String URL = "http://113.215.21.37/1Q2W3E4R5T6Y7U8I9O0P1Z2X3C4V5B/mir.wandoujia.com/files/release2/WanDouJia_2.80.1.7144_homepage.exe";
    //存放地址（及拓展名）
    private static final String PATH = "D:/wdj.exe";

    private final ArrayList<Integer> proList;
    private int progress;//当前进度
    private int totalSize;//总大小
    private boolean run = true;
    private long prevTime = 0;
    private int prevSize = 0;
    private MyPanel panel;
    private long totalTime = 0;

    private ProgressBarDownloader(int totalSize) {
        proList = new ArrayList<>();
        this.totalSize = totalSize;
        panel = new MyPanel();
        add(panel);
        setSize(500, 200);
        setLocationRelativeTo(null);
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        setLayout(null);
        setResizable(false);
        setVisible(true);
    }

    /**
     * @param progress 进度
     */
    private void updateProgress(int progress) {
        synchronized (this.proList) {
            if (this.run) {
                this.proList.add(progress);
                this.proList.notify();
            }
        }
    }

    private void finish(long totalTime) {
        this.run = false;
        this.totalTime = totalTime;
        //关闭进度条
    }


    @Override
    public void run() {
        synchronized (this.proList) {
            try {
                while (this.run) {
                    if (this.proList.size() == 0) {
                        this.proList.wait();
                    }
                    synchronized (proList) {
                        this.progress += this.proList.remove(0);
                        long currentTime = System.currentTimeMillis();
                        boolean print = currentTime - prevTime >= 1000;
                        if (!print) continue;
                        int percent = (int) ((((double) (this.progress)) / ((double) (totalSize))) * 100);

                        //字符串拼接 start
                        StringBuilder sb = new StringBuilder();
                        sb.append(percent);
                        sb.append("%[");
                        for (int i = 1; i <= percent / 4; i++) {
                            sb.append("=");
                        }
                        if (percent / 4 >= 1)
                            sb.append(">");
                        for (int i = 0; i <= 25 - percent / 4; i++) {
                            sb.append("  ");//在JPanel上显示时（2个空格的大小=一个等号的大小）
                        }
                        sb.append("]");
                        double speed = ((double) (progress - prevSize)) / ((double) (currentTime - prevTime)) * 1000 / 1024;
                        sb.append(String.format("%.1f", speed));
                        sb.append("K/s, will be finished in ");
                        double leaveTime = ((double) (totalSize - progress)) / 1024 / speed;
                        sb.append(String.format("%.2f", leaveTime));
                        sb.append("s");
                        //字符串拼接end

                        panel.setText(sb.toString());
                        //在控制台上显示时（1个空格的大小=一个等号的大小）
                        System.out.println(sb.toString().replace("  ", " "));

                        prevSize = progress;
                        prevTime = currentTime;
                    }
                }
                panel.setText("100%, 下载完成, 共耗时" + (totalTime / 1000) + "s, 总大小为" + (totalSize / 1024) + "Kb.");
                System.err.println("100%, 下载完成, 共耗时" + (totalTime / 1000) + "s, 总大小为" + (totalSize / 1024) + "Kb.");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private static class MyPanel extends JPanel {

        private JLabel labelProgress;
        private JLabel jtfLimit;
        static double limit = limitSpeed;//限速标志

        MyPanel() {
            labelProgress = new JLabel();
            labelProgress.setSize(500, 100);
            labelProgress.setLocation(50, 50);
            add(labelProgress);

            jtfLimit = new JLabel("限速：" + limit + "K/s");
            jtfLimit.setSize(300, 100);
            jtfLimit.setLocation(50, 0);
            add(jtfLimit);

            setLayout(null);
            setSize(500, 200);
            setVisible(true);
        }


        void setText(String text) {
            labelProgress.setText(text);//更新显示进度
        }
    }


    public static void main(String[] args) throws MalformedURLException {
        // 下载网络文件
        try {
            URL url = new URL(URL);

            URLConnection conn = url.openConnection();
            InputStream inStream = conn.getInputStream();
            FileOutputStream fs = new FileOutputStream(PATH);
            int connLength = conn.getContentLength();
            ProgressBarDownloader pbt = new ProgressBarDownloader(connLength);//创建进度条
            new Thread(pbt).start();//开启线程，刷新进度条
            long startTime = System.currentTimeMillis();
            pbt.prevTime = System.currentTimeMillis();
            byte[] buffer = new byte[1204];
            long prevTime = System.currentTimeMillis();
            int bytePrev = 0;//前一次记录的文件大小
            int byteSum = 0;//总共读取的文件大小
            int byteRead;//每次读取的byte数
            while ((byteRead = inStream.read(buffer)) != -1) {
                byteSum += byteRead;

                //当前时间
                long currentTime = System.currentTimeMillis();
                int speed = 0;
                if (currentTime - prevTime > 0) {//避免两次读数太近，导致分母为0
                    speed = (int) ((byteSum - bytePrev) / (currentTime - prevTime));
                }
                if (MyPanel.limit > 0 && (connLength - byteSum) > MyPanel.limit) {//设置了限速
                    if (speed > MyPanel.limit) {
                        //计算出需要等待多久才能达到限速要求：
                        int sleepTime = (int) ((byteSum - bytePrev) / MyPanel.limit + prevTime - currentTime);
//                        System.out.println("sleep " + sleepTime + "s");
                        Thread.sleep(sleepTime);
                    }
                }
                fs.write(buffer, 0, byteRead);//读取
                pbt.updateProgress(byteRead);//写完一次，更新进度条
            }
            pbt.finish(System.currentTimeMillis() - startTime);//下载完毕
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
