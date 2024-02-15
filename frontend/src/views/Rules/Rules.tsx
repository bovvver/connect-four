import { Wrapper, RulesBlock, Rule } from "./Rules.styles";
import Button from "@components/atoms/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { StyledIcon } from "../Main/Main.styles";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";

const Rules = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StyledIcon icon={faCircleHalfStroke} />
      <Button
        icon={<FontAwesomeIcon icon={faBackward} />}
        content="back"
        onClick={() => navigate("/connect-four/")}
      />
      <RulesBlock>
        <Rule>
          Be the first player to connect four discs of the same color in a row
          vertically, horizontally or diagonally,
        </Rule>
        <Rule>
          Players must take alternating turns, and only one disk can be dropped
          in each turn,
        </Rule>
        <Rule>
          On your turn, drop one of the colored disks from above onto any of the
          seven slots,
        </Rule>
        <Rule>The game ends when there are 4+ discs in a row or a draw,</Rule>
        <Rule>
          The starter from the previous game goes second to the next game.
        </Rule>
        <Rule>Good luck! 😁</Rule>
      </RulesBlock>
    </Wrapper>
  );
};

export default Rules;
