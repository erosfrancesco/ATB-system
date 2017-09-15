/*

Approximately 30 times a second => every loop

ATB increment:

-For characters:

	Normal:(96 * (Speed + 20)) / 16

	Hasted:(126 * (Speed + 20)) / 16

	Slowed:(48 * (Speed + 20)) / 16

-For monsters:

	Normal speed:((96 * (Speed + 20)) * (255 - ((Battle Speed - 1) * 24))) / 16

	Hasted:((126 * (Speed + 20)) * (255 - ((Battle Speed - 1) * 24))) / 16

	Slowed:((48 * (Speed + 20)) * (255 - ((Battle Speed - 1) * 24))) / 16


Once the ATB gauge has reached 65536, then characters are able to select a command.


Every 16 loops, each individual timer increments:


If character/monster is at normal speed: 64
If character/monster is hasted: 84
If character/monster is slowed: 32


If any character's/monster's time counter is over 255, then that counter is reduced by 256 and the following occur:


	-Stop status, then the "stop timer" is reduced by 1. When inflicted with Stop status, the "stop timer" is set 18.

If the character/monster does not have Stop status then the following also occur:

	-The character will get a chance to run 

	-Condemned status, the countdown is decreased by 1.

	-Reflect status, then the "reflect timer" is reduced by 1. When inflicted with Reflect, the "reflect timer" is set 26.

	-Freeze status, then the "freeze timer" is reduced by 1. When inflicted with Freeze status, the "freeze timer" is set 34.

	-Sleep status, then the "sleep timer" is reduced by 1. When inflicted with Sleep status, the "sleep timer" is set 18.

	-1 in 8 times, the character/monster will receive Poison damage if they are poisoned.

	-2 in 8 times, the character/monster will receive Seizure damage if they have Seizure status.

	-2 in 8 times, the character/monster will gain HP from Regen if they have Regen status.

Running:
	In side attacks this value is 0; otherwise, the value is equal to 2 times the number of monsters present
	(some monsters are harder to run from and add 6 to this value insteadof 2). There is also a "run success" variable 
	for each character. This value starts at 0 for each character. he characters are trying to run (it won't check during
	attack animations). If they are trying to run, then each character's "run success" value is increased.
	The amount added is dependent on the character, and is a random number from 1 to a maximum value.
*/