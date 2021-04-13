import axios, { AxiosError, AxiosResponse } from 'axios';
import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Modal,
  Form,
  Grid,
  GridRow,
  Header,
  Dropdown,
  Button,
  GridColumn,
  Input,
  TextArea,
  InputOnChangeData,
  TextAreaProps,
  DropdownProps,
} from 'semantic-ui-react';
import ImageUploader from 'react-images-upload';
import PuzzleSubmitDto from '../../../dataTypes/postDtoTypes/PuzzleSubmitDto';
import PuzzleDifficulty from '../../../dataTypes/PuzzleDifficulty';
import PuzzleMaterial from '../../../dataTypes/PuzzleMaterial';
import PuzzleType from '../../../dataTypes/PuzzleType';

interface SubmitPuzzleModalProps {
  onClose: () => void;
  onOpen: () => void;
  onSuccess: () => void;
  open: boolean;
  trigger: {};
}

interface isFieldFilled {
  titleFilled: boolean;
  descriptionFilled: boolean;
  difficultyFilled: boolean;
  typeFilled: boolean;
  materialsFilled: boolean;
  imageFilled: boolean;
}

const SubmitPuzzleModal = (props: SubmitPuzzleModalProps) => {
  const { onClose, onOpen, onSuccess, open, trigger } = props;

  const [
    { data: getTypesData, loading: getTypesLoading, error: getTypesError },
  ] = useAxios({
    url: 'http://localhost:8080/api/puzzle/getTypes',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [
    {
      data: getDifficultiesData,
      loading: getDifficultiesLoading,
      error: getDifficultiesError,
    },
  ] = useAxios({
    url: 'http://localhost:8080/api/puzzle/getDifficulties',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [
    {
      data: getMaterialsData,
      loading: getMaterialsLoading,
      error: getMaterialsError,
    },
  ] = useAxios({
    url: 'http://localhost:8080/api/puzzle/getMaterials',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  const [
    {
      data: postPuzzleData,
      loading: postPuzzleLoading,
      error: postPuzzleError,
    },
    executePuzzlePost,
  ] = useAxios(
    {
      url: `http://localhost:8080/api/puzzle/submitPuzzle`,
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    { manual: true }
  );

  const [imageUploading, setImageUploading] = useState(false);
  const [isFieldFilled, setIsFieldFilled] = useState<isFieldFilled>({
    titleFilled: false,
    descriptionFilled: false,
    difficultyFilled: false,
    typeFilled: false,
    materialsFilled: false,
    imageFilled: false,
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [puzzleToSubmit, setPuzzleToSubmit] = useState({} as PuzzleSubmitDto);
  const [uploadedImageInfo, setUploadedImageInfo] = useState({
    imageFile: [] as File[],
    imageName: '',
  });

  const [difficulties, setDifficulties] = useState({
    puzzleDifficulties: [] as PuzzleDifficulty[],
    loading: false as boolean,
    error: undefined as AxiosError<any> | undefined,
  });

  const [types, setTypes] = useState({
    puzzleTypes: [] as PuzzleType[],
    loading: false as boolean,
    error: undefined as AxiosError<any> | undefined,
  });

  const [materials, setMaterials] = useState({
    puzzleMaterials: [] as PuzzleMaterial[],
    loading: false as boolean,
    error: undefined as AxiosError<any> | undefined,
  });
  const [postPuzzleErrorMessage, setPostPuzzleErrorMessage] = useState('');

  //Dropdown values effects
  useEffect(() => {
    setTypes({
      ...types,
      loading: true,
    });

    if (getTypesData) {
      setTypes({
        ...types,
        puzzleTypes: getTypesData.map((el: string) => {
          return {
            key: Object.values(el),
            text: Object.values(el),
            value: Object.values(el),
          };
        }),
        loading: getTypesLoading,
      });
    } else {
      setTypes({
        ...types,
        error: getTypesError,
        loading: getTypesLoading,
      });
    }
    console.log(types.puzzleTypes);
  }, [getTypesData, getTypesLoading, getTypesError]);

  useEffect(() => {
    setDifficulties({
      ...difficulties,
      loading: true,
    });

    if (getDifficultiesData) {
      setDifficulties({
        ...difficulties,
        puzzleDifficulties: getDifficultiesData.map((el: string) => {
          return {
            key: Object.values(el),
            text: Object.values(el),
            value: Object.values(el),
          };
        }),
        loading: getDifficultiesLoading,
      });
    } else {
      setDifficulties({
        ...difficulties,
        error: getDifficultiesError,
        loading: getDifficultiesLoading,
      });
    }
    console.log(types.puzzleTypes);
  }, [getDifficultiesData, getDifficultiesLoading, getDifficultiesError]);

  useEffect(() => {
    setMaterials({
      ...materials,
      loading: true,
    });

    if (getMaterialsData) {
      setMaterials({
        ...materials,
        puzzleMaterials: getMaterialsData.map((el: string) => {
          return {
            key: Object.values(el),
            text: Object.values(el),
            value: Object.values(el),
          };
        }),
        loading: getMaterialsLoading,
      });
    } else {
      setMaterials({
        ...materials,
        error: getMaterialsError,
        loading: getMaterialsLoading,
      });
    }
    console.log(types.puzzleTypes);
  }, [getMaterialsData, getMaterialsLoading, getMaterialsError]);

  //Use effect which triggers submit button enabling (actions - interaction with required fields)
  useEffect(() => {
    handleSubmitButtonStatus()
      ? setIsSubmitDisabled(false)
      : setIsSubmitDisabled(true);
  }, [isFieldFilled]);

  useEffect(() => {
    setPostPuzzleErrorMessage(postPuzzleError?.response?.data);
  }, [postPuzzleError]);

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();

    setImageUploading(true);

    const formData = new FormData();
    formData.append('file', uploadedImageInfo.imageFile[0]);

    const imageUploadResponse: AxiosResponse<any> = await axios.post(
      `http://localhost:8080/api/puzzle/saveImage`,
      formData,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    setImageUploading(false);
    console.log('image status: ' + imageUploadResponse.status);

    if (imageUploadResponse.status == 201 && !imageUploading) {
      const materials: string[] = puzzleToSubmit.materials.map((el) => {
        return el[0];
      });
      const response = await executePuzzlePost({
        data: {
          title: puzzleToSubmit.title,
          description: puzzleToSubmit.description,
          type: puzzleToSubmit.type,
          difficulty: puzzleToSubmit.difficulty,
          brand: puzzleToSubmit.brand,
          materials: materials,
        } as PuzzleSubmitDto,
      });

      if (response.status == 201) {
        onSuccess();
        onModalClose();
      }
    } else {
      //error  notifa image parodyti
    }
  };

  const handleTitleInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setPuzzleToSubmit({ ...puzzleToSubmit, title: data.value.trim() });

    data.value.length > 0
      ? setIsFieldFilled({ ...isFieldFilled, titleFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, titleFilled: false });
  };

  const handleBrandInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setPuzzleToSubmit({ ...puzzleToSubmit, brand: data.value.trim() });
  };

  const handleDescriptionInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ) => {
    setPuzzleToSubmit({
      ...puzzleToSubmit,
      //@ts-ignore
      description: data.value?.toString().trim(),
    });

    //@ts-ignore
    data.value?.toString().length > 0
      ? setIsFieldFilled({ ...isFieldFilled, descriptionFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, descriptionFilled: false });
  };

  const handleDifficultyDropdown = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setPuzzleToSubmit({
      ...puzzleToSubmit,
      //@ts-ignore
      difficulty: data.value?.toString(),
    });
    //@ts-ignore
    data.value?.toString().length > 0
      ? setIsFieldFilled({ ...isFieldFilled, difficultyFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, difficultyFilled: false });
  };

  const handleTypeDropdown = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setPuzzleToSubmit({
      ...puzzleToSubmit,
      //@ts-ignore
      type: data.value?.toString(),
    });
    //@ts-ignore
    data.value?.toString().length > 0
      ? setIsFieldFilled({ ...isFieldFilled, typeFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, typeFilled: false });
  };

  const handleMaterialsDropdown = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setPuzzleToSubmit({
      ...puzzleToSubmit,
      //@ts-ignore
      materials: data.value,
    });
    //@ts-ignore
    data.value?.toString().length > 0
      ? setIsFieldFilled({ ...isFieldFilled, materialsFilled: true })
      : setIsFieldFilled({ ...isFieldFilled, materialsFilled: false });
  };

  const handleImageUpload = (files: File[], pictures: string[]) => {
    console.log(pictures);
    if (files.length > 0) {
      setUploadedImageInfo({
        ...uploadedImageInfo,
        imageFile: files,
        imageName: files[0].name,
      });
      setIsFieldFilled({ ...isFieldFilled, imageFilled: true });
    } else setIsFieldFilled({ ...isFieldFilled, imageFilled: false });
  };

  const handleSubmitButtonStatus = (): boolean => {
    if (
      isFieldFilled.descriptionFilled &&
      isFieldFilled.titleFilled &&
      isFieldFilled.difficultyFilled &&
      isFieldFilled.typeFilled &&
      isFieldFilled.materialsFilled &&
      isFieldFilled.imageFilled
    ) {
      return true;
    } else return false;
  };

  const onModalClose = () => {
    setIsFieldFilled({
      titleFilled: false,
      descriptionFilled: false,
      difficultyFilled: false,
      typeFilled: false,
      materialsFilled: false,
      imageFilled: false,
    } as isFieldFilled);
    setPuzzleToSubmit({} as PuzzleSubmitDto);
    setUploadedImageInfo({
      imageFile: [] as File[],
      imageName: '',
    });
    setIsSubmitDisabled(true);
    setPostPuzzleErrorMessage('');
    onClose();
  };

  return (
    <Container>
      <Modal
        as={Form}
        open={open}
        onClose={onModalClose}
        onOpen={onOpen}
        trigger={trigger}
        size='tiny'
        closeOnEscape
        closeOnDimmerClick={false}
        closeIcon
      >
        <Modal.Header>
          <Container textAlign='center'>Add puzzle to collection</Container>
        </Modal.Header>
        <Modal.Content>
          <Grid columns='2'>
            <GridRow key={'modal_titleInput'}>
              <GridColumn width='4'>
                <Header as={'h5'}>{'Title'}</Header>
              </GridColumn>
              <GridColumn width='8'>
                <Input
                  fluid
                  focus
                  placeholder={'Puzzle title'}
                  onChange={handleTitleInputValue}
                ></Input>
              </GridColumn>
            </GridRow>
            <GridRow key={'modal_brandInput'}>
              <GridColumn width='4'>
                <Header as={'h5'}>{'Brand'}</Header>
              </GridColumn>
              <GridColumn width='8'>
                <Input
                  fluid
                  focus
                  placeholder={'Brand title'}
                  onChange={handleBrandInputValue}
                ></Input>
              </GridColumn>
            </GridRow>
            <GridRow key={'modal_descriptionTextArea'}>
              <GridColumn width='4'>
                <Header as={'h5'}>{'Description'}</Header>
              </GridColumn>
              <GridColumn width='8'>
                <TextArea rows='5' onChange={handleDescriptionInput}></TextArea>
              </GridColumn>
            </GridRow>
            <GridRow key={'modal_difficultyDropdown'}>
              <GridColumn width='4'>
                <Header as={'h5'}>{'Difficulty'}</Header>
              </GridColumn>
              <GridColumn width='8'>
                <Dropdown
                  selection
                  fluid
                  placeholder='Select difficulty'
                  onChange={handleDifficultyDropdown}
                  options={difficulties.puzzleDifficulties}
                  loading={getDifficultiesLoading}
                ></Dropdown>
              </GridColumn>
            </GridRow>
            <GridRow key={'modal_typeDropdown'}>
              <GridColumn width='4'>
                <Header as={'h5'}>{'Type'}</Header>
              </GridColumn>
              <GridColumn width='8'>
                <Dropdown
                  selection
                  fluid
                  placeholder='Select puzzle type'
                  onChange={handleTypeDropdown}
                  options={types.puzzleTypes}
                  loading={getTypesLoading}
                ></Dropdown>
              </GridColumn>
            </GridRow>
            <GridRow key={'modal_materialsMultiDropdown'}>
              <GridColumn width='4'>
                <Header as={'h5'}>{'Materials'}</Header>
              </GridColumn>
              <GridColumn width='8'>
                <Dropdown
                  multiple
                  selection
                  fluid
                  placeholder='Select materials'
                  onChange={handleMaterialsDropdown}
                  options={materials.puzzleMaterials}
                  loading={getMaterialsLoading}
                ></Dropdown>
              </GridColumn>
            </GridRow>
            <GridRow key={'modal_ImageFileUpload'}>
              <GridColumn width='4'>
                <Header as={'h5'}>{'Image'}</Header>
              </GridColumn>
              <GridColumn width='8'>
                <ImageUploader
                  withIcon={false}
                  buttonText='Choose image'
                  singleImage={true}
                  withPreview
                  onChange={handleImageUpload}
                  label={'Accepted formats: jpg/png'}
                  imgExtension={['.jpg', '.png']}
                  maxFileSize={5242880}
                ></ImageUploader>
              </GridColumn>
            </GridRow>

            {
              //TODO error handling component
              //@ts-ignore
              (postPuzzleErrorMessage === 'Internal Server Error' ||
                postPuzzleErrorMessage === 'Bad Request') && (
                <Container textAlign='center'>
                  <Header as='h5' className='error'>
                    {postPuzzleError?.response?.data.error}
                  </Header>
                </Container>
              )
            }
            {
              //TODO error handling component
              postPuzzleErrorMessage ===
                'Puzzle with such title already submitted' && (
                <Container textAlign='center'>
                  <Header as='h5' className='error'>
                    {postPuzzleError?.response?.data}
                  </Header>
                </Container>
              )
            }
            <GridRow key={'modal_submitButtons'} centered>
              <Button size='mini' onClick={onModalClose}>
                Cancel
              </Button>
              <Button
                size='mini'
                disabled={isSubmitDisabled}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </GridRow>
          </Grid>
        </Modal.Content>
      </Modal>
    </Container>
  );
};

export default SubmitPuzzleModal;
