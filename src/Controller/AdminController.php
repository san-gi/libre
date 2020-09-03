<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Chapitre;
use App\Entity\Image;
use App\Form\ChapitreType;
use App\Form\UploadimageType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="admin")
     */
    public function index(Request $request,SluggerInterface $slugger)
    {
         $img = new Image;
         $form = $this->createForm(UploadimageType::class,$img);
         $form->handleRequest($request);
         if ($form->isSubmitted() && $form->isValid()) {
            $files = $form->get('images')->getData();
            foreach($files as $file){ 
                $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();
                $file->move(
                    $this->getParameter('images_directory'),
                    $newFilename
              
        );
    }

        //     $chapitre->setDate(new \DateTime());
            //  $entityManager = $this->getDoctrine()->getManager();
            //  $entityManager->persist($chapitre);
            //  $entityManager->flush();
        //     // do anything else you need here, like send an email
         }
        $chapitres = $this->getDoctrine()->getRepository(Chapitre::class)->findAll();
        $articles = $this->getDoctrine()->getRepository(Article::class)->findAll();


        return $this->render('admin/index.html.twig', [
            'controller_name' => 'AdminController',
            'chapitres' =>$chapitres,
            'articles' =>$articles,
             'upload' =>$form->createView()
        ]);
    }
}
