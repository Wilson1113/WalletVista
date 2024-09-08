import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';

const AssetBreakdownChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartHeight, setChartHeight] = useState(window.innerHeight * 0.4);
  const [fontSize, setFontSize] = useState(window.innerWidth * 0.02);
  const { publicKey, connected } = useWallet();
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setChartHeight(window.innerHeight * 0.4);
      setFontSize(window.innerWidth * 0.02);
    };

    window.addEventListener('resize', handleResize);

    const getTokenBalances = async () => {
      if (publicKey && connected) {
        const connection = new Connection("https://young-proportionate-fire.solana-mainnet.quiknode.pro/0c17b37032345886c8c5af71d6ea9c9494dfe079/");
        
        // Fetch SOL balance
        const solBalance = await connection.getBalance(publicKey);
        const solBalanceInSol = solBalance / 1e9; // Convert lamports to SOL

        // Fetch all token accounts for the wallet
        const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') });
        
        const tokenBalances = tokenAccounts.value.map(({ account }) => {
          const amount = account.data.parsed.info.tokenAmount.uiAmount;
          const mint = account.data.parsed.info.mint;
          return { mint, amount };
        });

        // Combine SOL balance with token balances
        const combinedBalances = [{ mint: 'SOL', amount: solBalanceInSol }, ...tokenBalances];
        setBalances(combinedBalances);
      }
    };

    getTokenBalances();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [publicKey, connected]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.updateOptions({
        series: balances.map(balance => balance.amount),
        labels: balances.map(balance => balance.mint),
        plotOptions: {
          pie: {
            donut: {
              labels: {
                total: {
                  fontSize: fontSize + 'px',
                },
              },
            },
          },
        },
        legend: {
          labels: {
            fontSize: fontSize + 'px',
          },
        },
      });
    } else {
      const options = {
        series: balances.map(balance => balance.amount),
        labels: balances.map(balance => balance.mint),
        chart: {
          type: 'donut',
          height: chartHeight,
          background: 'transparent',
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150,
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350,
            },
          },
        },
        colors: ['#00ff7f', '#ff9900', '#00bcd4', '#ff6347', '#4682b4', '#dda0dd'],
        plotOptions: {
          pie: {
            donut: {
              size: '70%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total Amount',
                  fontSize: fontSize + 'px',
                  fontFamily: 'Fredoka',
                  formatter: function (w) {
                    return (
                      w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0)
                    );
                  },
                },
              },
            },
          },
        },
        legend: {
          position: 'bottom',
          labels: {
            colors: 'var(--text-color)',
            fontSize: fontSize + 'px',
            fontFamily: 'Fredoka',
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            radius: 12,
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: true,
          theme: 'dark',
          y: {
            formatter: function (value) {
              return '$' + value.toFixed(2);
            },
          },
        },
        stroke: {
          width: 1,
        },
        theme: {
          mode: 'dark',
          palette: 'palette1',
          monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65,
          },
        },
      };

      chartInstance.current = new ApexCharts(chartRef.current, options);
      chartInstance.current.render();
    }
  }, [balances, chartHeight, fontSize]);

  return <div id="asset-breakdown-chart" ref={chartRef}></div>;
};

export default AssetBreakdownChart;
