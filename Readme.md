# Prerequisites

# CAD Development

- Install Freecad
- Install KiCad
- Install Freecad KiCad StepUp plugin.
- Install https://github.com/perigoso/keyswitch-kicad-library.
  - Use the "Plugin and Content Manager" program of Kicad.
  - add the library path for Switch_Keyboard_Kailh 
  - Add value of the Kicad variable "KICAD6_3DMODEL_DIR" to secondary 3D folder location in KiCad StepUp
- Download the usb connector 3d model from https://www.molex.com/molex/part/partModels.jsp?&prodLevel=part&partNo=2169900001&channel=products
  to <repo>/grapto-v3w-pcb/216990-0001_stp/

## Linux

Set report mode characteristic to report

$ sudo bluetoothctl
menu scan
clean
transport le
back
scan on
connect E9:9E:30:E3:E4:5B

# Flashing


## compile and flash using running openocd server

Start openocd server

  root@mycontainer openocd -f openocd.cfg
  
Build and flash:
  
  reset halt
  stm32f1x mass_erase 0
  flash write_bank 0 src/programmable-remote.bin 0
  reset halt
