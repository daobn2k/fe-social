import {
	ChatCentered,
	MagnifyingGlass,
	ShareFat,
	ThumbsUp,
} from '@phosphor-icons/react';
import InputTextField from '../../components/InputTextField';
import Text from '../../components/Text';
import styles from './index.module.scss';
import { Button, Image } from 'antd';
const News = () => {
	return (
		<div className={styles.news}>
			<div className={styles.left}>
				<div className={styles.top}>
					<Text type="font-20-semi-bold" color="--text-primary">
						Bảng tin
					</Text>
					<InputTextField
						placeholder="Tìm kiếm bài viết"
						prefix={<MagnifyingGlass size={24} weight="regular" />}
					/>
				</div>
				<div className={styles.bottom}>
					<Text
						type="font-20-medium"
						color="--text-primary"
						fontFamily="font-mono-sans"
					>
						Tin gần đây
					</Text>
					<div className={styles.recents}>
						<ItemComment />
						<ItemComment />
						<ItemComment />
						<ItemComment />
						<ItemComment />
						<ItemComment />
						<ItemComment />
						<ItemComment />
						<ItemComment />
						<ItemComment />
						<ItemComment />
					</div>
				</div>
				<div className={styles.button}>
					<Button>Đăng tin</Button>
				</div>
			</div>
			<div className={styles.right}>
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
				<NewItem />
			</div>
		</div>
	);
};

export default News;

const NewItem = () => {
	return (
		<div className={styles.newItem}>
			<div className={styles.head}>
				<img
					src="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
					className={styles.avatar}
				/>
				<div className={styles.info}>
					<Text type="font-14-medium" color="--text-primary">
						Patrick Hendricks
					</Text>
					<Text type="font-12-regular" color="--text-tertiary">
						10:00 AM
					</Text>
				</div>
			</div>
			<div
				className={styles.richText}
				dangerouslySetInnerHTML={{
					__html: `Hỗ trợ hệ thống miễn dịch, thị lực và trí óc trẻ với Kinder Optima, Visio và Omega3 Syrups ! 🛡️👁️🧠 #suckhoetrenho #bobahoanhao Top 1 brand in OTC category (NielsenIQ AGM, sales value, food retailers + drugstores DE, MAT February 2024, Copyright © 2024, Nielsen Consumer LLC)`,
				}}
			/>
			<div className={styles.previewImages}>
				<Image.PreviewGroup
					preview={{
						onChange: (current, prev) =>
							console.log(`current index: ${current}, prev index: ${prev}`),
					}}
				>
					<Image src="data:image/jpeg;base64,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" />
					<Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWphenrFmicwysLQ7LtQdOxkPkS0EbrcckaA&s" />
					<Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWphenrFmicwysLQ7LtQdOxkPkS0EbrcckaA&s" />
					<Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb0PVFGKeCI0B-5g7YCRxMswyp-vBmmiJeT6aSBsU8nbZ5YSbBMnF6VU-g6fglmy507O0&usqp=CAU" />
					<Image src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAECAwUGBwj/xABJEAABAwICBAgLBgQEBgMAAAACAAEDBBIRIgUTITEGMkFCUVJhcRQjYnKBgpGSobHBFVOi0eHwBzNDk3SD0vEkNFRjc7IXRFX/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAKREAAgIBAwMDBQADAAAAAAAAAAECERIDITETQVEEFGEicYGh8CNSU//aAAwDAQACEQMRAD8Ax6kYqgOLm8nesiSGeI9bTzl5JDiLt7N7fvBXnWa3j5S/e51Epedd6w7+zHpX0yi0eM5Jmho7hXPSgMVdHrh6w7H9j7H+C1JK/QfCExiltjl8vZ6N7be1sVxs7X9W7ydzoMhQ9FPdbMcdaXD3On0pwIroju0cQ1ERY2jdgTcuD44N6XwXN1NLPSzaqpgkjl6pjh/utHRun9J6NPxM5EPVk2t+fxXWwaT0PwppvBtJj4PU8wrtl2G9n6ex9/apucOd0X9E+NmeeYJ8Ft8IODdZoOYdaJTUxcWoGN2F36HfazP6dvtwyGFbxakrRjJOLpkWZOzKTCpMytIzbIsykzKTMnZlaRDYmZTZkmZTZk6IbGZlMWSZlNmVUQ2SBkTASoZTFOjPKnZojPzUTTzWmN6y4yRcRLOUTohq2dAdSIBaBXLMkqFS0ioM1lDTo3nq2X+EIaoO/L7qgxKqV71somEtW0D4JKSSs5rBqp+KWoIfOF0IcxeatjwmmzDLJaP/AI8dvt2Ktg0YR55C9UcPouRfY72l5MdNa66YINDmFoFm5xF/uonoujvuilh9YvohTRePhnN4KyLKd37fsWlVaMsPIUfqkyqhoZTO20S/zG/NaKjN3wdHwb4RThCNHUFHNBdgUc+3FuTB+hu1XcKOCgyhBXcH6QrZMktPFgTAW3M2D7G2YYd3SsSKAqc/G0g8uYS2+jbgtfg9wiKKs8GqyKOmk2XCLvg+OzF8djb9rLnnBxeen+fk3hqJrCZypUsoGQyjqyEsDE8rs/Kzs+1n7E/gv/cEvNXqWmdD0fCSmvIhjrBDCGo2vsbawn0tjjt3tjy7n810ho+s0dUlBWwSQyj1h2P2s+527WV6GutTbh+DLW0ZQ37eSgKWUsoRkXm7fkpHTSh/TIVBk66qOZsTAnYU7MpCyqiGxmFTEU6mBEHFIhTIbHjDr5VY0XreaoYkatCUh5yNxWu5ZFCjIoMipgmJFRzWLKVm8IwaK9WSqIUWcipJ0kXJIEJlSaLIENIK1RzzKsEk+CSoysyWLyR91SE4+fH+J2TWJ7VhR22i4Wpj+8j9Zn+aIDRgy/yquP18qCYFJmRj4DJBpaHrhzBFrB60ZM/yVXjqUrZRlj84XZ/Y6sp9IVNPxJcvVLatKPhDU2WywRyD1SHFvjip+vwmVem+9GYNUQc0S8/64OnlrZZeqPmrRLSNDL/N0XH6uz5YKoh0ZLxBnh/E3zxTXyiXxSkiug0xWUWWIrh6pfToWhpjhHPpTRsdJLEOUryIsHw7GxbFseXB9uCzTpoP6NSJD5UbsqbFXShJ5VuQ9acVjexUwqTCr44SM7QG4kQGj5TO2Ibi5R5W71paRkrfAEwqbxmPGHt9CLmo5ac89pclw7WxZO1JLqdbbluwIuh+h0WiXlxQIwp2FFahSGnTtEbgzAptGjQp/JU3hSzLWkwWMbFezqxoVYMBKG0aRjJFFxKDuSO8Dls/lF7rqJUxBzSUqSNHGQA4qJRo7UpPCqyI6dmdqkloalJPMXSOasT2InVpNGkR1AfVp2jRLRqTRJkvUBmjUmjRLRKbQknYs2DNGpMCMGmJWDSpZIKkwIY1dDCPPRYUivjpfJSeoio6crJ00WqMbINXdzjFlrUlLeZX6uQublb9shISnDnXedtRNPIQHcfO41u9cs22ehp0hpNHShzR43f7HRHgGth1RlaJY8bpba2Hfgj6ZxlC24rrspEtJ4BMLT/fcuaWs1ydMdKLOD8GsO1TGBdXVaNisKU+aOA2/DFZZU4roj6hSOWXp8WZwQJ2gvPIK16Vyp+bd5Oz8kXJVDKGekuLmkUhO3s/VS9Zp8FrSjXJz7UxdW3ztnzUhpy8n3mf5LecoCAfFwRldmtjLd3Y/VVEefII2/8AjbH6pdZvsV0Uu4ADVnFAezKI/lvUho9I2ZKae30syNiKUMwZfNFm+iNjr6kQ/wDskX+JIW9jYLOWrJcJFqCfLZjDobSEvEpLbu/Bu/a+Hp6VoQcD6yW6+rhjt6sZk/swZWlWV0p5CqfNGeXv6yFlqKwuNV1P983+bqXqaz4aQYaa5VhjcCD5dJbf8KaSzcar76r/ALhfmkp/z/8AT9FXpf6fsx3pxLKFJo0f8wnf244qstGlL/Qg9SQ/q7rbGl8ovedWNSeUXvOl7hrgb9LF8oxB0YX/AOfH5xSH/qZS+xp/+mEfNkb6ut4aTyi951aFH5Re8j3UvIL0cPBz/wBkz/cD/cH81ENHygf8i724fBdONH5Re86sGk8ovedL3bH7SJy7URfdkPqv9UVHoq8Lso+cTM/sxXQ+CeUXvOpjSF95J/cdS/VPsNelijCj0WPWj/uYfmrC0SPGCeP3m/Nbf2eJ8e4vOJ3Tto4eqp9y/Jft4+DGi0Tf/U9wcfrgrvsUrLrvw/litVtGD1fmpfZodX5qX6h+QWhHwZsGjiDncXyX+rI+CEsua63rC+72K37MHq/idTHRg9VRLVvllx00uxGalvArCHN1sW+aGHRPXKmH/N/R1oNo0eqnbRY9VQtWu5T00+xmtR0wZTkg9Unx9rNh8E70tD95b6rv8XZlp/ZY9VO2ixT63yw6fwZBxUYcQpC9VmTt4H9wXnFc/wAnZlrfZQ9X8SdtGj5XvOjqryw6Zla6jDKNIPnFA2PtcndU3U1//LTF/ms3wYFtfZo+Um+zB8r3klqRF02YhHF/0kfrkT/J2VNQAy8SPV+SOOHxd3+K6F9GRdX8SZtFxdUv7jq1rJCek2cv4MXVJJdV9nD1fxJKvck+3OSE1aJoISVon5SbiXYcJq0TQImrWkUuJVhwmrQJZ7TKxp1OIZGgJK0SWW9R5Xup2qSS6bDM2BJWCSy4qjromOQTUOA1IOYlJpBQjOpsXkpYjyDGkUmNDx51czKWkO2WXpNIo4JJbBuWMae9QZk7MjYNyy9K5V4J2ZFINyy5M5qFqZ2SpBuTckrlW7KLunQWXXpKi5JGIZHnQkrRkHimQiXp+OCEOAQC7WDm4vL8f0VmpGK0jkuEuda2PoxXfsc+5fJVShliEfO2Ph3Oyq8KnM/Gzl5vJ7ExlTZf5hedhtbvwTgIncUUZEPV5cO/BNUuwnfkOgmi593ut9VcVpcS7o/eCpg1vFCiju8rD5O6JGSf7sY8uFxFg3sx+TLNvc0S8l8MWS3Nbzsuz2urhpR5hF7rYe1nwQA3GfjamPk6Sb9FfFDEAZ5x6cpbPYof3GvsGNTed8FaL6oM/wBX+CzyecAzyR277hLczdDfkiLLIbrpCiLjWiz4d7YpP5Y/wHs1wDxhLzcH9iui1/PL5LPjlgA8k4iOz+jg/tbDDuR4TxGGST8TLKVlIvwS8wUEWk4AD+oRc4ejvw5UWFVAcOtDi9a1/lypNNdh2mW4F1fkl++X8lG8f9JDi/zTPUiB2nJHyc3p3YdKncZaLkrG81Vazjcb3mf4Ko5IhzHlL99GCOQC2tTuQ9b81lyV4hxCEvOL4KLaTEwtOMvg7fFlXTkLNGrj+7lWbIOSefjRQXRb+K6cK2KXLbaXV3JYsLQQ9yZ3JDhUjzx90nUrxPiSF5qdCLsUlVcXT+L9Ukh0ed0hDz4B1Q7Lpc2PofZj2syKjpYA8aZZSxy3buzF/qgKGCAwuOpEpfNcvg+G5F/ZMpnrTqSLq2Cwvj7XwXY2r5MUnXAQ81HFaR6yPLh0vu7ccFWVeMvigknkIiy3Ezbeh8d3eqItF5/GlaXVORm+rYqT6JsqbdeMPKJb/Zt+qPo7sHl4D4i0iFSNmoEdnFkHD0s+Ds/oV0k0sX/MTwCPNy3Ft27Gxf5rNamGntKo0lGQydUXxdkZRy6MiMhCfLJ1o2+L7cVL/til/bhEtKUoCUUl120crDs6MOn0oZ4tUBEE+a7ijht7nx2+xM+kYIrhpIBkG57i2u7duzYzKRaYgiASiHoy6tsG7e/0oWXgTxIgEstoncO+0jyts34O6IiCppwuAhLrWyN++XkQ0mmbzEoovG9YsOn9G7VfDpaeXxXgl0vkizPg+G9t3Km8vAvp8lsNFKQa2K0uURtcfZi+1SKjlCHWgQjOI5oxLazcr9rqTUdYEJWDqxt4oyDg2zu5XQYVQnqi1hSSlgxCQ4Y8mDYPi6SbfcGkiUEpAf8AULktHFlpQTxH/NKe7qyFu5N7MhAoqmWG4KaQbdmUd744bWd93ayjPCUR6qrGpGURxG3B9mOzZ+TpumJWjQKo8HO0xLVc3M3z5OlR8KprCvg820nxx5cX6OxZ1N4NrrpbtVttu27fQiAgpSDjZh79vz2qaSHbYc9bcA+DlqxHjDsx9u9/SjaecSAb5CIebux7ndU09AWpyQDm5pYM7NyY9vL6UVCPg9vhBRx3cUQHFunb7VlJrsaRT7gz6NiqM0U5CV2GYWfb8FSVIIHqPH3Dxi2W7mfHDfh6eVaFSEvGpCEi50e53bsfpTUtRUmdssBDFa/GF8Wdnww+aFOVBigOKKWK3WkVo9TAm7tqt8JgqJrZRIrRx1nL3u7LQJhDMZZUHNRUN91tpf8AbLBuzDkSUk+R41wVlTEJ+KkL1i3/AL6E7xZLst3O3benZgmklgAxiPWDusIixvd33PhydqseKl/q3XdUsUW+4UgfWFymOPoSRXgsbbPAyftZJGUfAsPk8jDSVgFFTxjGJc7a7+19qMotIjFcOaS7ilyM/csaURim6w81WlLFEfipxtLDKOLs3Y+O112NJnPFtGoWmfE5M0vOk2YO3c7IN6qpltvIi32/XYpTaRpgphGnG6W7NcPyZkKWkCMOaPVt5O7oQvsEn8h8EJSmN8nn7mdm7Md/oRfgkF912sG3HVkT49+LNtbuwWBHWEPOu5c21XVGlJ6jjlxeLb27FW4rjR0dDWeC3XzxiI4OEdzk79ODu+zc3tVM2kb5tfqI+i0hxbHsbdisnR9DXVp/8PBIQ7M1r4be3cuupeC8GpHwuQpJeqBPhioljF2y1lJbGfJLKAa2WOkEpONbhu7cdnJyKqKq4soSDHbixCXLhtZm2fV1eegyrTIgnGMRLDN9envVNJoUqibVVAzx7/HDtY8H3s+79EJxoGpWbGh9JFUXRGWaTG0S6H37OhGjVUdFU208Y6/iHJtfDsbHd3oWkin0bo0oA8dLtttHB9r8nzQmi9F1lRU68xjjijJ8suLu79jdnT/us6i7fY0V7HYHP4m4yjuIeKO/bu2q3weCoAdbBGRCOF1z4s3Ri21mxVMVNbCOqy+aihEutbb+9q5m/BqYVfwc1s2tp6kYYi2kJC72bNuD47dvJs3vt2LSooqWnAYgzakXtkIcd77cOhEFEJ8ciTAGfi2jzlTm2qbJUUnaIxCQZqefXZs12x9r47EqqMqqmyFq83OFERvEGUCSIh+6L1VN7lUC01PqgIpZNYWznPsbkVlXVDTh5Rc3fuUZOPdmEiHL/ssHSRyhNacRXFsHlVRWTE3Rs6OrSqJpRlK4d4/LBFyBBYXiBLl4v7xWbSSDTwiIR2kqKmtni8bbaIyM3odGNvYLNcqaAw4o/N25cEPWUcstvg8mrEeMPc+z671OCr1ocW1MZXnd5P6pK0xgvg2kOSIcOzDBOidakqyZNHg7ykfOSxXTUXBUrLqsh80duHpRtNwcii8pdWSOZQZx2ZSZiXcHwfiv1tOI3eUOLfoitGaMGnMvEDrSxuLk7mZLNFLTZzGj+D1ZVU2v1ZcjiJbMWXRaG4PUdBbPVlrp9lomLYA/Lgz737XXRjTkcNuszdZCvosQPW1FSRfBZvUs0WmkFvGNRlCcvoynC0FLlOTN5Syy0jTRHqKfKRF3u/5qoKOuqOOOru5xFj8GU4+S7OijKmqMoCJfqpaqIctorLgpypztuuL8lcbz/v6KGhhrNFfkHMpZTuQkTWc65WsZAlQwppubbancrAWfPpCKI7ech6vSQ2cZCiBrRziZ8ZUaT0hYGoituJBUVSNmclc0lNFmy8b5oqmAPouq1U11QVt3F7luNWCfOWOY0tRmO25OwCeYCTkkxI1jqBzIc5RQckghzkBLWDLWDFTyZutv+SSiM0oaOKKpKsMriIcO5kUJwVGXKSwzkrKeEhlIbdua79/t0FT1pBU8ZVi33FdHTlF47i5d6dzFDtVa2myeshteIc7KpoZqXCksrwxJPEDPkJU6y87QzI16S/zkNDENPMUplm3ehaEBcBSgGfKrGkzqsDE81uVORDepGEsw38ZWg0R873lnM3lKmWq1QWh7yWI7JzQwU9frwG6Xm9DLRjmyCsIagTPrEs+t4X6F0aZRTaQEpB3jEJSYO3I7szsz9junLbkEjqTmE5rbuKlJKNmReb1v8Qaa/wD4KCSQi+98Wzdrvg7v3M3Iuc0jw30xVH4qtKki5o02Xl2O5Y4v8G7Fm5xRWJ7VFUiHHVNRWFfkG5eFaO0zXUF0VDUlGMhM5iAgLu7bGd3w7XUKnSlZUTFLLV1MhdYpyJ2boZ8d3dsU9RDxPUOENVLFU63MOVmu2tyciw6jT8UVt8/qiWPyXCyVBc+Qi84ndQaTzS/fYq63hBidy3DjVBbFAWXrYN9ULLwxlMOdmxu3Nh3Ljr0zmo6rHiddTcL6ynuzXXdb5Leh/iJBEFoCXF6uzFeZOaZ5Euqwo9Aqf4iFLxKYvKzMzP6NqEg4deCzFPT0RFKXGvkw+LM64h5FFzR1WGJ2mk+H+k623xEcIjhlud2fB8ezoQ8XDWe+6WmEi6wSOPwdn+a5ByTXJLVkuAxTPR2/icMVMUQaLLW9Yp2Zv/XFAF/Emu1doaNp+wiMib2Nh81w3qpJdSXkKR2H/wAi6b+7of7Jf6klxySXUYz6Jmq9UFqCCTW5kkl2owZdrU4S3pJJjQ71GS1c1wg0qNFbriIbsbbduP5JJKRnA6Y4R1NTrI4pZI6WTY4tscm6HdtuHYsTWWcUUyS5JSbe5oiLuroqYzxwcRxHHby7G6Ox2SSUFLkrZPckkgQ9yTkkkkMeSXHHERbDfgLN8mUbiSSQA2BWXehM6SSAGd0iaw7UkkANik2b5el9ySSBMRMQXD1Swf0KLtekkmAsUkkkAf/Z" />
				</Image.PreviewGroup>
			</div>
			<div className={styles.reaction}>
				<div className={styles.item}>
					<ThumbsUp size={24} color="#00000" weight="bold" />
					<Text type="font-14-regular" color="--text-primary">
						Thích
					</Text>
				</div>
				<div className={styles.item}>
					<ChatCentered size={24} color="#00000" weight="bold" />
					<Text type="font-14-regular" color="--text-primary">
						Bình luận
					</Text>
				</div>
				<div className={styles.item}>
					<ShareFat size={24} color="#00000" weight="bold" />
					<Text type="font-14-regular" color="--text-primary">
						Chia sẻ
					</Text>
				</div>
			</div>

			<div className={styles.listComments}>
				<ItemComment />
				<ItemComment />
				<ItemComment />
				<ItemComment />
				<ItemComment />
			</div>
			<Text
				type="font-14-semi-bold"
				color="--text-primary"
				style={{ textAlign: 'center', cursor: 'pointer' }}
			>
				Xem thêm bình luận
			</Text>
		</div>
	);
};

const ItemComment = () => {
	return (
		<div className={styles.chatItem}>
			<img
				src="http://chatvia-light.react.themesbrand.com/static/media/avatar-2.feb0f89de58f0ef9b424.jpg"
				className={styles.avatar}
			/>
			<div className={styles.info}>
				<Text type="font-14-medium" color="--text-primary">
					Patrick Hendricks
				</Text>
				<Text type="font-12-regular" color="--text-tertiary">
					Patrick Hendricks
				</Text>
			</div>
			<Text type="font-12-regular" color="--text-tertiary">
				10:30 AM
			</Text>
		</div>
	);
};
