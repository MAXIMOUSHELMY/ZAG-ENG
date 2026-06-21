import matplotlib
matplotlib.use('TkAgg') 

import numpy as np
import matplotlib.pyplot as plt


t= np.linspace(0,1,1000)
F = 5
analog_signal = np.sin(2*np.pi*F*t)
Fs= 200
Ts = np.arange(0,1,1/Fs)
sampled_signal = np.sin(2*np.pi*F*Ts)
print("sensor data: ", sampled_signal)
quantized_bits = 4
quantized_levels = 2**quantized_bits
max=1
min=-1
delta = (max - min) / quantized_levels #1/16
quantized_signal = np.round((sampled_signal - min) / delta) * delta + min
print("quantized data: ", quantized_signal)


plt.figure(figsize=(10,5))
plt.subplot(1,2,1)
plt.plot(t,analog_signal, linewidth=2)
plt.stem(Ts,sampled_signal,linefmt="r")
plt.xlabel('    Time (s)')
plt.ylabel('S(t)')
plt.title('Analog Signal')
plt.grid(True)
plt.subplot(1,2,2)

plt.stem(Ts,quantized_signal,linefmt="g")
plt.xlabel('    Time (s)')
plt.ylabel('S(t)')
plt.title('Quantized Signal')
plt.grid(True)
plt.show()